import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ButtonSubmit } from "@/app/_components/buttons";
import { useAppSelector } from "@/store/store";
import { DocumentData, doc, updateDoc } from "firebase/firestore";

import { PageLoading } from "../loadings";
import ColorPicker from "../colorPicker";
import { addDocBoard } from "@/firebase/features/board";
import { getDocById } from "@/firebase/features/getDoc";
import { FIREBASE_DB } from "@/firebase/config";


export default function ModalBoard() {
    const currentProject = useAppSelector((state) => state.projectReducer)
    const { replace } = useRouter()
    const searchParams = useSearchParams()
    const boardParam = searchParams.get('board') as string
    const errorText = 'Something went wrong! Please try again later.'
    const [loading, setLoading] = useState(true)
    const [inputs, setInputs] = useState<DocumentData>({
        id: '', name: '', color: '#E7E7E7',
    })

    useEffect(() => {
        if (!boardParam) setLoading(false)
        else getBoard()
    }, [])

    async function getBoard() {
        const boardDoc = await getDocById(boardParam, `projects/${currentProject.id}/boards`)
        if(!boardDoc) return replace('?');
        setInputs(boardDoc)
        setLoading(false)
    }

    function getFormData(formData: FormData) {
        return {
            name: (formData.get('name') as string).trim(),
            color: (formData.get('color') as string).trim(),
        }
    }

    async function createBoard(board: any) {
        if(await addDocBoard(currentProject.id, board)) replace('?')
        else alert(errorText)
    }

    async function updateBoard(board: any) {
        try {
            await updateDoc(doc(FIREBASE_DB, `projects/${currentProject.id}/boards/${boardParam}`), board)
            .then(() => replace('?'))
        } catch (error) {
            return alert(errorText)
        }
    }

    return loading ? <PageLoading /> : (
        <form className='form' action={formData => {
                const updatedBoard: {} = getFormData(formData)
                return boardParam ? updateBoard(updatedBoard) : createBoard(updatedBoard)
            }}
            style={{ borderRight: `4px solid ${inputs.color}` }}
        >
            <div className='form-inputs'>
                <div style={{display: 'inline-flex', width: '100%'}}>
                    <input placeholder="Name" name="name" className="title" required
                        defaultValue={inputs.name}
                        maxLength={20}
                        autoComplete="off"
                    />
                </div>
                <ColorPicker defaultValue={inputs.color}
                    onChange={(e: any) => setInputs({...inputs, color: e.target.value})}
                />
            </div>
            <div className='form-buttons'>
                <button className="button-secondary" type="button" onClick={() => replace('?', { scroll: false })}>
                    Close
                </button>
                <ButtonSubmit text={'Save'} />
            </div>
        </form>
    );
}