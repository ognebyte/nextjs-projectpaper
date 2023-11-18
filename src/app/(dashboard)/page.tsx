'use client'

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/store/store'
import { DocumentData, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { FIREBASE_DB } from '@/firebase/config';

import RightArrow from '@/assets/svg/right-arrow';
import { ComponentLoading } from '@/app/_components/loadings';


export default function Dashboard() {
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const [userProjects, setUserProjects] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(
            collection(FIREBASE_DB, 'projects'),
            where("members", "array-contains", currentUser.uid),
            orderBy('createdAt', 'desc')
        );
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            var obj: DocumentData[] = []
            querySnapshot.forEach((doc) => {
                obj.push(Object.assign({ id: doc.id }, doc.data()))
            });
            setUserProjects(obj)
            setLoading(false)
        });
        return () => unsubscribe()
    }, [])


    return (
        <div className='dashboard-container'>
            {loading ?
                <div className="dashboard-loading">
                    <ComponentLoading />
                </div>
                :
                userProjects?.length == 0 ?
                    <div className="dashboard-empty">
                        <p>You have no projects,</p>
                        <Link href={{ query: { modal: 'createProject' } }} scroll={false}>
                            create a new project
                        </Link>
                    </div>
                    :
                    <div className="dashboard-content">
                        {userProjects?.map(project => (
                            <Link className="dashboard-project" key={project.id} href={`/project/${project.id}`}
                                style={{ borderColor: project.color }}
                            >
                                <div className="info">
                                    <h2 className='title'>{project.title}</h2>
                                </div>
                                <RightArrow />
                            </Link>
                        ))}
                    </div>
            }
        </div >
    )
}
