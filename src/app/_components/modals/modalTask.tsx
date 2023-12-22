import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ButtonClose, ButtonDelete, ButtonSubmit } from "@/app/_components/buttons";
import { useAppSelector } from "@/store/store";
import { DocumentData, collection, doc, documentId, getDocs, query, updateDoc, where } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";
import moment from "moment";

import { PageLoading } from "../loadings";
import { sortArrByArrOrder } from "@/app/_utils/sort";
import { getDocById } from "@/firebase/features/getDoc";
import { addDocTask, deleteDocTask } from "@/firebase/features/task";
import ColorDot from "../colorDot";


export default function ModalTask() {
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const currentProject = useAppSelector((state) => state.projectReducer)
    const boardsRef = `projects/${currentProject.id}/boards/`
    const { replace } = useRouter()
    const searchParams = useSearchParams()
    const [selectedBoard, setSelectedBoard] = useState(searchParams.get('board') as string)
    const taskParam = searchParams.get('task') as string
    const [boards, setBoards] = useState<any>()
    const [inputs, setInputs] = useState<DocumentData>({
        id: '', title: '', description: '',
        createdAt: '', createdBy: '',
        date: '', time: '', priority: '',
    })
    const [loading, setLoading] = useState(true)
    const errorText = 'Something went wrong! Please try again later.'

    useEffect(() => {
        if (!selectedBoard || !currentProject.id) replace('?')
        else getBoards()
    }, [])

    async function getBoards() {
        const boardsRef = collection(FIREBASE_DB, `projects/${currentProject.id}/boards`);
        const q = query(boardsRef, where(documentId(), "in", currentProject.boards));

        var obj: DocumentData = []
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) return replace('?');
        querySnapshot.forEach((doc) => {
            obj.push(Object.assign(doc.data(), { id: doc.id }))
        });
        obj = sortArrByArrOrder(obj, currentProject.boards, 'id');
        setBoards(obj);
        var board = obj.find((el: any) => el.id == selectedBoard)
        if (!taskParam || !board) setLoading(false);
        else getParams(board);
    }

    async function getParams(obj: any) {
        if ('tasks' in obj) {
            const taskDoc = await getDocById(taskParam, boardsRef + `${obj.id}/tasks`)
            if (!taskDoc) return replace('?');
            setInputs({
                ...taskDoc,
                date: taskDoc.date ? moment.unix(taskDoc.date).format('yyyy-MM-DD') : '',
            })
        }
        else return replace('?');
        setLoading(false);
    }

    function getFormData(formData: FormData) {
        return {
            board: formData.get('board'),
            title: (formData.get('title') as string).trim(),
            description: (formData.get('description') as string).trim(),
            date: formData.get('date') ? moment(formData.get('date') as string, 'YYYY-MM-DD').unix() : '',
            time: formData.get('time') ? formData.get('time') : '',
            priority: formData.get('priority'),
            createdBy: currentUser.uid,
            createdAt: moment().unix(),
        }
    }

    async function updateTask(task: any) {
        try {
            const updatedTask = Object.assign(task, { updatedAt: moment().unix() })
            if (inputs.board == updatedTask.board) {
                await updateDoc(doc(FIREBASE_DB, boardsRef + `${inputs.board}/tasks/${inputs.id}`), updatedTask)
                    .then(() => replace('?'));
            }
            else {
                if (await deleteTask()) {
                    const res = await addDocTask(currentProject.id, updatedTask.board, updatedTask)
                    if (res) replace('?')
                }
            }
        } catch (error) {
            alert(errorText)
        }
    }

    async function createTask(task: any) {
        try {
            const res = await addDocTask(currentProject.id, task.board, task)
            if (res) replace('?')
        } catch (error) {
            alert(errorText)
        }
    }

    async function deleteTask() {
        const res = await deleteDocTask(currentProject.id, inputs.board, inputs.id, [...boards])
        return res
    }

    return loading ? <PageLoading /> : (
        <form className='form' action={formData => {
                const updatedTask: {} = getFormData(formData)
                return taskParam ? updateTask(updatedTask) : createTask(updatedTask)
            }}
            style={{ borderRight: `4px solid ${boards.find((el: any) => el.id == selectedBoard).color}` }}
        >
            <div className='form-inputs'>
                <div className="input-container board-container">
                    <div className="board">
                        <h3>Board:</h3>
                        <select name="board" value={selectedBoard} onChange={e => setSelectedBoard(e.target.value)}>
                            {boards.map((board: any) =>
                                <option key={board.id} value={board.id}>
                                    {board.name}
                                </option>
                            )}
                        </select>
                        <ColorDot width={24} height={24}
                            color={boards.find((el: any) => el.id == selectedBoard).color}
                        />
                    </div>
                    {!taskParam ? null :
                        <ButtonDelete color="rgb(181, 48, 44)" onClick={async () => await deleteTask() ? replace('?') : alert(errorText)} />
                    }
                </div>
                <input placeholder="Title" name="title" className="title" defaultValue={inputs.title} required />
                <div className="input-container">
                    <h3>Priority:</h3>
                    <div className={`select-container ${inputs.priority}`}>
                        <select name="priority" value={inputs.priority}
                            className={inputs.priority}
                            style={inputs.priority ? {} : { opacity: 0.6 }}
                            onChange={e => setInputs(obj => ({ ...obj, priority: e.target.value }))}
                        >
                            <option value=''>Empty</option>
                            <option value='low'>Low</option>
                            <option value='medium'>Medium</option>
                            <option value='high'>High</option>
                        </select>
                    </div>
                </div>
                <div className="input-container date-time">
                    <h3>Due date:</h3>
                    <input name="date" type="date" value={inputs.date}
                        style={inputs.date ? {} : { opacity: 0.6 }}
                        onChange={e => !e.target.value ?
                            setInputs(obj => ({ ...obj, date: e.target.value, time: '' }))
                            :
                            setInputs(obj => ({ ...obj, date: e.target.value }))
                        }
                    />
                    {!inputs.date ? null :
                        <input name="time" type="time" value={inputs.time}
                            style={inputs.time ? {} : { opacity: 0.6 }}
                            onChange={e => setInputs(obj => ({ ...obj, time: e.target.value }))}
                        />
                    }
                    {!inputs.time ? null :
                        <ButtonClose onClick={() => setInputs(obj => ({ ...obj, time: '' }))} />
                    }
                </div>
                <textarea placeholder='Description' name='description' className="description" defaultValue={inputs.description} />
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