'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DocumentData, collection, collectionGroup, documentId, onSnapshot, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import moment from "moment";

import { ComponentLoading, PageLoading } from "@/app/_components/loadings";
import Plus from "@/assets/svg/plus"
import DotsVertical from "@/assets/svg/dots-vertical";
import { sortArrByArrOrder } from "@/app/_utils/sort";
import { deleteDocBoard } from "@/firebase/features/board";
import { useAppSelector } from "@/store/store";


export default function Tasks() {
    const currentProject = useAppSelector((state) => state.projectReducer)
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const { replace } = useRouter()
    const [boards, setBoards] = useState<DocumentData>([])
    const [boardsTasks, setBoardsTasks] = useState<DocumentData>()
    const [isDrag, setIsDrag] = useState(false)
    const [loading, setLoading] = useState(true)
    const [selectedBoard, setSelectedBoard] = useState('')
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    useEffect(() => {
        if (currentProject.boards.length == 0) {
            setBoards([])
            setLoading(false)
        }
        else {
            const boardsRef = collection(FIREBASE_DB, `projects/${currentProject.id}/boards`);
            const q = query(boardsRef, where(documentId(), "in", currentProject.boards));
            const unsubscribe = onSnapshot(q, querySnapshot => {
                var obj: DocumentData = []
                querySnapshot.forEach(doc => {
                    obj.push(Object.assign(doc.data(), { id: doc.id }))
                })
                obj = sortArrByArrOrder(obj, currentProject.boards, 'id')
                setBoards(obj)
                setLoading(false)
            });
            return () => unsubscribe()
        }
    }, [currentProject])

    useEffect(() => {
        if (boards.length != 0) {
            const boardsRef = collectionGroup(FIREBASE_DB, `tasks`);
            const q = query(boardsRef, where('board', "in", currentProject.boards));
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
    function dragStart(e: any) { e.dataTransfer.setData("taskId", e.target.id); }
    async function drop(e: any, boardId: any) {
        var data = e.dataTransfer.getData("taskId");
        console.log(data, boardId)
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget); };
    const handleClose = () => { setAnchorEl(null); };

    async function deleteBoard(boardId: any) {
        const res = await deleteDocBoard(currentProject.id, boardId, [...currentProject.boards])
    }

    return loading ? <div className="content-loading flex-center"><ComponentLoading /></div> :
        <div className="boards">
            {!boards ? null :
                boards.map((board: DocumentData) => (
                    <div className="board" key={board.id}>
                        <div className="board-header" style={{ borderColor: board.color }}>
                            <span className="board-background" style={{ backgroundColor: board.color }} />
                            <div className="board-name">
                                <h3>{board.name} ({!board.tasks ? '0' : board.tasks.length})</h3>
                            </div>
                            <button className="board-option" onClick={(e: any) => { handleClick(e); setSelectedBoard(board.id) }}>
                                <DotsVertical />
                            </button>
                            <Menu anchorEl={anchorEl} open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                            >
                                <MenuItem onClick={() => replace(`?modal=board&board=${selectedBoard}`, { scroll: false })}>
                                    <p>Edit</p>
                                </MenuItem>
                                <MenuItem onClick={() => deleteBoard(selectedBoard)}>
                                    <p style={{ color: 'rgb(181, 48, 44)' }}>Delete</p>
                                </MenuItem>
                            </Menu>
                        </div>
                        <ul className="tasks" onDrop={e => drop(e, board.id)} onDragOver={allowDrop}>
                            <span className="tasks-background" style={{ backgroundColor: board.color }} />
                            {!board.tasks ? null : !boardsTasks ?
                                <div className="tasks-loading"><ComponentLoading /></div> :
                                board.tasks.map((taskId: string) => {
                                    var task = boardsTasks.find((el: any) => el.id === taskId)
                                    if (!task) return null
                                    return (
                                        <li key={taskId} id={taskId} className="task" draggable
                                            onDragStart={e => dragStart(e)}
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
                                    )
                                })
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
                <button onClick={() => replace('?modal=board', { scroll: false })}
                    className="button-plus flex-center"
                >
                    <h3>New board</h3>
                    <Plus />
                </button>
            </div>
        </div>
}