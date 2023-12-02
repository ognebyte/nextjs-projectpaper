'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentData, arrayRemove, collection, collectionGroup, doc, documentId, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";
import moment from "moment";

import { ComponentLoading, PageLoading } from "@/app/_components/loadings";
import Plus from "@/assets/svg/plus"
import DotsVertical from "@/assets/svg/dots-vertical";
import { sortArrByArrOrder } from "@/app/_utils/sort";
import { getDocById } from "@/firebase/features/getDoc";


export default function Tasks({ project, currentUser }: { project: any, currentUser: any }) {
    const [boards, setBoards] = useState<DocumentData>()
    const [boardsTasks, setBoardsTasks] = useState<DocumentData>()
    const [isDrag, setIsDrag] = useState(false)
    const [loading, setLoading] = useState(true)
    const { replace } = useRouter()


    useEffect(() => {
        if (!project.boards) setLoading(false)
        else {
            const boardsRef = collection(FIREBASE_DB, `projects/${project.id}/boards`);
            const q = query(boardsRef, where(documentId(), "in", project.boards));
            const unsubscribe = onSnapshot(q, querySnapshot => {
                var obj: DocumentData = []
                querySnapshot.forEach(doc => {
                    obj.push(Object.assign(doc.data(), { id: doc.id }))
                })
                obj = sortArrByArrOrder(obj, project.boards, 'id')
                setBoards(obj)
                setLoading(false)
            });
            return () => unsubscribe()
        } 
    }, [project])

    useEffect(() => {
        if (boards) {
            const boardsRef = collectionGroup(FIREBASE_DB, `tasks`);
            const q = query(boardsRef, where('board', "in", project.boards));
            const unsubscribe = onSnapshot(q, querySnapshot => {
                var obj: DocumentData = []
                querySnapshot.forEach(doc => {
                    obj.push(Object.assign(doc.data(), { id: doc.id }))
                })
                setBoardsTasks(obj)
            })
            return () => unsubscribe()
        }
    }, [boards])

    function allowDrop(e: any) { e.preventDefault(); }
    function dragStart(e: any) {
        setIsDrag(true)
        e.dataTransfer.setData("taskId", e.target.id);
    }
    function dragEnd(e: any) { setIsDrag(false) }
    async function drop(e: any) {
        var data = e.dataTransfer.getData("taskId");
        console.log(data)
    }
    
    async function deleteTask(boardId: any, boardIndex: any, taskIndex: any) {
        if (!boards) return;
        var updTasks = [...boards[boardIndex].tasks];
        updTasks.splice(taskIndex, 1)
        await updateDoc(doc(FIREBASE_DB, `projects/${project.id}/boards/${boardId}`), {
            tasks: updTasks
        })
    }

    return (
        <div className="boards">
            {loading ? <PageLoading /> :
                !boards ? null :
                    boards.map((board: DocumentData, boardIndex: any) => (
                        <div className="board" key={board.id}
                            onDrop={e => drop(e)} onDragOver={e => allowDrop(e)}
                            onDragEnter={e => console.log('enter')}
                        >
                            <div className="board-header" style={{ borderColor: board.color }}>
                                <span className="board-background" style={{ backgroundColor: board.color }} />
                                <div className="board-name">
                                    <h3>{board.name}</h3>
                                </div>
                                <button className="board-option">
                                    <DotsVertical />
                                </button>
                            </div>
                            <ul className="tasks">
                                <span className="tasks-background" style={{ backgroundColor: board.color }} />
                                {!board.tasks ? null : !boardsTasks ?
                                    <div className="tasks-loading"><ComponentLoading /></div> :
                                    board.tasks.map((taskId: string) => {
                                        var task = boardsTasks.find((el: any) => el.id === taskId)
                                        if (!task) return null
                                        return (
                                            <li key={taskId} id={taskId} className="task" draggable
                                                onDragStart={e => dragStart(e)} onDragEnd={e => dragEnd(e)}
                                                onClick={() => replace(`?modal=task&board=${board.id}&task=${taskId}`, { scroll: false })}
                                            >
                                                <p className="title">{task.title}</p>
                                                {!task.priority ? null :
                                                    <div className="priority-container">
                                                        <p>Priority:</p>
                                                        <p className={'priority ' + task.priority}>
                                                            {task.priority}
                                                        </p>
                                                    </div>
                                                }
                                                {!task.date ? null :
                                                    <p>
                                                        Due date: {moment.unix(task.date).format('ll')}
                                                        {!task.time ? null : `, ${task.time}`}
                                                    </p>
                                                }
                                                <p className="created-at">
                                                    Created at: {moment.unix(task.createdAt).format('MMM DD, YYYY')}
                                                </p>
                                            </li>
                                    )})
                                }
                            </ul>
                            <button onClick={() => replace(`?modal=task&board=${board.id}`, { scroll: false })}
                                className="task-create"
                            >
                                <p>Add task</p>
                            </button>
                        </div>
                    ))
            }
            <div className="board-create">
                <button onClick={() => replace('?modal=createBoard', { scroll: false })}
                    className="button-plus flex-center"
                >
                    <h3>New board</h3>
                    <Plus />
                </button>
            </div>
        </div>
    )
}