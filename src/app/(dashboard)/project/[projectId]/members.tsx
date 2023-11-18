'use client'

import { useEffect, useState } from "react";
import { DocumentData } from "firebase/firestore";
import getDocById from "@/firebase/features/getDoc";
import { ComponentLoading } from "@/app/_components/loadings";
import moment from "moment";

import Sort from "@/assets/svg/sort";


const COLORS = ['#8AB4F8', '#F28B82', '#FDD663', '#81C995', '#FF8BCB', '#C58AF9', '#FCAD70', '#78D9EC',]


export default function Members({ project, currentUser }: { project: any, currentUser: any }) {
    const [members, setMembers] = useState<DocumentData[]>([]);

    useEffect(() => {
        getMembers()
    }, [project.members])

    async function getMembers() {
        var obj: DocumentData[] = []
        await Promise.all(project.members.map(async (memberId: string) => {
            const [user, role] = await Promise.all([
                getDocById(memberId, 'users'),
                getDocById(project.id, `users/${memberId}/projects`)
            ])
            obj.push(Object.assign({ id: memberId }, user, role))
        }))
        setMembers(obj)
    }

    return (
        <div className="members-container">
            <div className="column-name">
                <div className="sort flex-center"><Sort color="#888888" /></div>
                <h3>Username</h3>
                <h3>Email</h3>
                <h3>Role</h3>
                <h3>Joined</h3>
            </div>
            {members.length == 0 ?
                <div className="loading flex-center">
                    <ComponentLoading />
                </div>
                :
                <ul className="members">
                    {members.map((member) => (
                        <li key={member.id} className="member">
                            <div className="avatar-container flex-center">
                                <p className="avatar flex-center"
                                    style={{ backgroundColor: COLORS[Math.floor(Math.random() * 8)] }}
                                >
                                    {member.username[0]}
                                </p>
                            </div>
                            <div className="username-container">
                                <p className="username"> {member.username} </p>
                                {member.id != currentUser.uid ? null :
                                    <p className="you">(You)</p>
                                }
                            </div>
                            <p className="email"> {member.email} </p>
                            <p className="role"> {member.role} </p>
                            <p className="joined"> {moment.unix(member.joined).format('MMM DD, YYYY')} </p>
                        </li>
                    ))
                    }
                </ul>
            }
        </div>
    )
}