import { useState } from "react";
import { useRouter } from "next/navigation";
import { ButtonSubmit } from "@/app/_components/buttons";
import ErrorMessage from "@/app/_components/errorMessage";
import { useAppSelector } from "@/store/store";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";
import moment from "moment";
import ColorPicker from "@/app/_components/colorPicker";


export default function ModalCreateProject() {
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const { push, replace } = useRouter()
    const [errorStatus, setErrorStatus] = useState(false)
    const [errorText, setErrorText] = useState('')

    async function createProject(formData: FormData) {
        let title = (formData.get('title') as string).trim()
        let description = (formData.get('description') as string).trim()
        let color = formData.get('color')
        if (title.length == 0) {
            setErrorText('Title field empty')
            setErrorStatus(true)
            return 0
        }
        try {
            var unixDate = moment().unix()
            const projectRef = await addDoc(
                collection(FIREBASE_DB, 'projects'), {
                title: title,
                description: description,
                createdAt: unixDate,
                color: color,
                members: [currentUser.uid],
                boards: [
                    { name: 'Todo', color: '#E7E7E7' },
                    { name: 'In progress', color: '#8AB4F8' },
                    { name: 'Done', color: '#81C995' },
                ],
            }
            );
            await setDoc(
                doc(FIREBASE_DB, `users/${currentUser.uid}/projects/${projectRef.id}`), {
                role: 'owner',
                joined: unixDate,
            });
            push(`/project/${projectRef.id}`)
        } catch (error) {
            alert('Something went wrong! Please try again later.')
        }

    }

    return (
        <form className='form' action={createProject}>
            <div className='form-inputs'>
                <input placeholder='Title' type='text' name='title'
                    className="title" maxLength={20}
                />
                <textarea placeholder='Description' name='description'
                    className="description"
                />
                <ColorPicker />
                {!errorStatus ? null :
                    <ErrorMessage onClick={() => setErrorStatus(false)} text={errorText} />
                }
            </div>
            <div className='form-buttons'>
                <button className="button-secondary" type="button" onClick={() => replace('?', { scroll: false })}>
                    Cancel
                </button>
                <ButtonSubmit text={'Create'} />
            </div>
        </form>
    );
}