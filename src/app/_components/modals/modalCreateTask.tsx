import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ButtonSubmit } from "@/app/_components/buttons";
import ErrorMessage from "@/app/_components/errorMessage";
import { useAppSelector } from "@/store/store";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";
import moment from "moment";
import ColorPicker from "@/app/_components/colorPicker";


export default function ModalCreateTask() {
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const { push, replace } = useRouter()
    const [errorStatus, setErrorStatus] = useState(false)
    const [errorText, setErrorText] = useState('')
    const searchParams = useSearchParams()
    const boardParam = searchParams.get('board')
    

    async function createTask(formData: FormData) {
        let text = (formData.get('text') as string).trim()
        if (text.length == 0) {
            setErrorText('Title field empty')
            setErrorStatus(true)
            return 0
        }
        try {
        //     var unixDate = moment().unix()
        //     const projectRef = await addDoc(
        //         collection(FIREBASE_DB, 'projects'), {
        //         title: title,
        //         text: text,
        //         createdAt: unixDate,
        //         members: [currentUser.uid],
        //         boards: [
        //             { name: 'Todo', color: '#E7E7E7' },
        //             { name: 'In progress', color: '#8AB4F8' },
        //             { name: 'Done', color: '#81C995' },
        //         ],
        //     }
        //     );
        //     await setDoc(
        //         doc(FIREBASE_DB, `users/${currentUser.uid}/projects/${projectRef.id}`), {
        //         role: 'owner',
        //         joined: unixDate,
        //     });
        //     push(`/project/${projectRef.id}`)
        } catch (error) {
            alert('Something went wrong! Please try again later.')
        }
    }

    return (
        <form className='form' action={createTask}>
            <div className='form-inputs'>
                <p>{boardParam}</p>
                <textarea placeholder='Text' name='description'
                    className="description"
                />
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