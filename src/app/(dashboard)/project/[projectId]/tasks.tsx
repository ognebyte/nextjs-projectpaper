'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { DocumentData, collection, doc, getDocs, onSnapshot, query } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";
import { ComponentLoading } from "@/app/_components/loadings";

import Plus from "@/assets/svg/plus"
import { useRouter } from "next/navigation";


export default function Tasks({ project, currentUser }: { project: any, currentUser: any }) {
    const [tasks, setTasks] = useState<DocumentData>()
    const { replace } = useRouter()


    useEffect(() => {
        if (project) getTasks()
    }, [project])

    async function getTasks() {
        const querySnapshot = await getDocs(collection(FIREBASE_DB, "projects", project.id, "tasks"));
        var obj: DocumentData[] = []
        querySnapshot.forEach((doc) => {
            obj.push(Object.assign({ id: doc.id }, doc.data()));
        });
        setTasks(obj)
    }

    return (
        <div className="boards">
            {!project ? <ComponentLoading /> :
                !project.boards ? null :
                    project.boards.map((board: DocumentData) => (
                        <div className="board" key={board.name}>
                            <div className="board-header" style={{ borderColor: board.color }}>
                                {/* max length 50 */}
                                <span className="board-background" style={{ backgroundColor: board.color }} />
                                <h3 className="board-name">{board.name}</h3>
                            </div>
                            <ul className="tasks">
                                <span className="tasks-background" style={{ backgroundColor: board.color }} />
                                {tasks == undefined ?
                                    <div className="loading flex-center">
                                        <ComponentLoading />
                                    </div>
                                    :
                                    tasks.map((el: DocumentData) => {
                                        if (el.board == board.name)
                                            return (
                                                <li key={el.id} className="task">
                                                    {el.title}
                                                </li>
                                            )
                                    })
                                }
                            </ul>
                            <button onClick={() => replace(`?modal=createTask&board=${board.name}`, { scroll: false })}
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