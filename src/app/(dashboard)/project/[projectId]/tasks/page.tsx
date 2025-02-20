'use client'

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { DocumentData, collection, collectionGroup, documentId, onSnapshot, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";
import { deleteDocBoard } from "@/firebase/features/board";
import { ComponentLoading } from "@/app/_components/loadings";
import { sortArrByArrOrder } from "@/app/_utils/sort";
import { useAppSelector } from "@/store/store";

import Table from "@/assets/svg/table";
import Board from "@/assets/svg/boards";


const TasksBoard = dynamic(() => import('./tasksBoard'), { ssr: false })
const TasksTable = dynamic(() => import('./tasksTable'), { ssr: false })


export default function Tasks() {
    const currentProject = useAppSelector((state) => state.projectReducer)
    const [boards, setBoards] = useState<DocumentData>([])
    const [boardsTasks, setBoardsTasks] = useState<DocumentData>()
    const [isBoardsVertical, setIsBoardsVertical] = useState(true)
    const [loading, setLoading] = useState(true)


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


    async function deleteBoard(boardId: any) {
        const res = await deleteDocBoard(currentProject.id, boardId, [...currentProject.boards])
    }

    return loading ? <div className="content-loading flex-center"><ComponentLoading /></div> :
        <div className="tasks-container">
            <nav className="tasks-type">
                <button className={`button-type ${isBoardsVertical ? 'active' : ''}`}
                    onClick={() => setIsBoardsVertical(true)}
                >
                    Board <Board/>
                </button>
                <button className={`button-type ${isBoardsVertical ? '' : 'active'}`}
                    onClick={() => setIsBoardsVertical(false)}
                >
                    Table <Table/>
                </button>
            </nav>
            {isBoardsVertical ? <TasksBoard boards={boards} boardsTasks={boardsTasks} deleteBoard={deleteBoard}/> :
                <TasksTable boards={boards} boardsTasks={boardsTasks} currentProject={currentProject}/>
            }
        </div>
}