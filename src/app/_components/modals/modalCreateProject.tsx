import { useRouter } from "next/navigation";
import { ButtonSubmit } from "@/app/_components/buttons";
import { useAppSelector } from "@/store/store";
import { DocumentData, addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";
import moment from "moment";
import ColorPicker from "@/app/_components/colorPicker";
import { setDocById } from "@/firebase/features/setDoc";
import { addDocByCollection } from "@/firebase/features/addDoc";
import { useState } from "react";


const DEFAULT_BOARDS = [
    { name: 'Todo', color: '#E7E7E7' },
    { name: 'In progress', color: '#8AB4F8' },
    { name: 'Done', color: '#81C995' },
]

export default function ModalCreateProject() {
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const { push, replace } = useRouter()
    const [color, setColor] = useState('#E7E7E7')

    async function createProject(formData: FormData) {
        try {
            let title = (formData.get('title') as string).trim()
            let description = (formData.get('description') as string).trim()
            let color = formData.get('color')
            let requests = formData.get('requests')
            var unixDate = moment().unix()
            const projectRef = await addDoc(
                collection(FIREBASE_DB, 'projects'), {
                title: title,
                description: description,
                createdAt: unixDate,
                color: color,
                members: [currentUser.uid],
                requests: requests ? true : false,
                requestsToJoin: [],
            });

            var boardsId: DocumentData = []
            await Promise.all([
                DEFAULT_BOARDS.map(async board => {
                    const id = await addDocByCollection(`projects/${projectRef.id}/boards/`, board)
                    boardsId.push(id)
                }),
                setDocById(`users/${currentUser.uid}/projects/${projectRef.id}`, {
                    role: 'owner',
                    joined: unixDate,
                })
            ])
            await updateDoc(doc(FIREBASE_DB, `projects/${projectRef.id}`), { boards: boardsId })
            push(`/project/${projectRef.id}`)
        } catch (error) {
            alert('Something went wrong! Please try again later.')
        }

    }

    return (
        <form className='form' action={createProject}
            style={{ borderRight: `4px solid ${color}` }}
        >
            <div className='form-inputs'>
                <input placeholder='Title' type='text' name='title' required
                    className="title" maxLength={20}
                />
                <textarea placeholder='Description' name='description'
                    className="description" maxLength={1000}
                />
                <ColorPicker onChange={(e: any) => setColor(e.target.value)} />
                <div className="requests">
                    <p>Users can send requests to join:</p>
                    <input type='checkbox' name='requests'/>
                </div>
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