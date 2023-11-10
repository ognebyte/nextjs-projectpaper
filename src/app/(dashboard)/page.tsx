'use client'

import { useEffect, useState } from 'react';
import { useAppSelector } from '@/store/store'
import { DocumentData, collection, onSnapshot, query, where } from 'firebase/firestore';
import moment from 'moment';
import { FIREBASE_DB } from '@/firebase/config';


export default function Dashboard() {
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const [userProjects, setUserProjects] = useState<DocumentData[]>();

    useEffect(() => {
        const q = query(
            collection(FIREBASE_DB, 'projects'),
            where("members", "array-contains", currentUser.uid)
        );
        const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const userProjects: DocumentData[] = [];
            await querySnapshot.forEach((doc) => {
                userProjects.push(Object.assign({ id: doc.id }, doc.data()));
            });
            setUserProjects(userProjects)
        });
        return () => unsubscribe()
    }, [])


    return (
        <div className='dashboard-container'>
            <div className="dashboard-content">
                {userProjects?.length == 0 ? <p>Create new project</p> :
                    userProjects?.map(project => (
                        <div className="project-card" key={project.id}>
                            <h2>{project.title}</h2>
                            <h2>{project.description}</h2>
                            <h2>{moment(project.createdAt).format('LL')}</h2>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
