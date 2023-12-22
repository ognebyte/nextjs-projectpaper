'use client'

import ColorDot from "@/app/_components/colorDot"
import { ComponentLoading, PageLoading } from "@/app/_components/loadings"
import { sortArrByArrOrder } from "@/app/_utils/sort"
import { getCollectionBoards } from "@/firebase/features/board"
import { getProjectMembers } from "@/firebase/features/member"
import { useAppSelector } from "@/store/store"
import { DocumentData } from "firebase/firestore"
import moment from "moment"
import { useEffect, useState } from "react"


export default function Overview() {
    const currentProject = useAppSelector((state) => state.projectReducer)
    const [loading, setLoading] = useState(true)
    const [members, setMembers] = useState<DocumentData>([])
    const [boards, setBoards] = useState<DocumentData>([])

    useEffect(() => {
        Promise.all([
            getBoards(),
            getMembers(),
        ]).then(() => setLoading(false))
    }, [currentProject])

    async function getBoards() {
        if (currentProject.boards.length == 0) return;
        var obj = await getCollectionBoards(currentProject.id, currentProject.boards)
        obj = sortArrByArrOrder(obj, currentProject.boards, 'id')
        setBoards(obj)
    }
    async function getMembers() {
        const obj = await getProjectMembers(currentProject.id, currentProject.members)
        setMembers(obj)
    }

    return loading ? <div className="content-loading flex-center"><ComponentLoading /></div> :
        <div className="overview-container">
            <div className="overview-primary">
                <h2 className="title">
                    <ColorDot color={currentProject.color} width={24} height={24} />
                    {currentProject.title}
                </h2>
                {boards.length == 0 ? null :
                    <div className="overview-block project-boards">
                        <h3>Tasks</h3>
                        <div className="progress">
                            {boards.map((board: any) =>
                                !board.tasks ? null : board.tasks.length == 0 ? null :
                                    <span className="board-progress" key={board.id + 'color'}
                                        style={{
                                            flex: !board.tasks ? 0 : board.tasks.length,
                                            backgroundColor: board.color
                                        }}
                                    />
                            )}
                        </div>
                        <ul className="info">
                            {boards.map((board: any) =>
                                <li className="board" key={board.id}>
                                    <ColorDot color={board.color} width={16} height={16} border={true} />
                                    <p>{board.name} ({!board.tasks ? 0 : board.tasks.length})</p>
                                </li>
                            )}
                        </ul>
                    </div>
                }
                <div className="overview-block project-members">
                    <h3>Members</h3>
                    <ul className="members">
                        {members.map((member: any) =>
                            <li className="member" key={member.id}>
                                <p>{member.username} ({member.role})</p>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="overview-secondary">
                <div className="overview-block">
                    <h3 style={{ marginBottom: '8px' }}>Description</h3>
                    {!currentProject.description ?
                        <p className="disabled">Empty</p>
                        :
                        <p className="description">{currentProject.description}</p>
                    }
                </div>
                <p className="disabled" style={{ marginLeft: 'auto' }}>
                    Created at: {moment.unix(currentProject.createdAt).format('LL')}
                </p>
            </div>
        </div>
}