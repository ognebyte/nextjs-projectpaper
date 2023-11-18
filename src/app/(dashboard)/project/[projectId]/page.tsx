'use client'

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useAppSelector } from "@/store/store"
import { DocumentData, doc, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";
import { ComponentLoading, PageLoading } from "@/app/_components/loadings";

const Tasks = dynamic(() => import('./tasks'), { loading: () => <PageLoading /> })
const Members = dynamic(() => import('./members'), { loading: () => <PageLoading /> })
const Settings = dynamic(() => import('./settings'), { loading: () => <PageLoading /> })

const TABS = [
    { label: 'Tasks', component: Tasks, href: '?' },
    { label: 'Members', component: Members, href: { query: { tab: 'members' } } },
    { label: 'Settings', component: Settings, href: { query: { tab: 'settings' } } },
]

export default function Project({ params }: { params: { projectId: string } }) {
    const [currentTab, setCurrentTab] = useState<any>()
    const searchParams = useSearchParams()
    const search = searchParams.get('tab')
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const [currentProject, setCurrentProject] = useState<DocumentData>();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const projectDoc = doc(FIREBASE_DB, 'projects', params.projectId);
        const unsubscribe = onSnapshot(projectDoc, (snap) => {
            var projectObj = Object.assign({ id: snap.id }, snap.data())
            setCurrentProject(projectObj);
            setLoading(false)
        });
        return () => unsubscribe()
    }, [])


    useEffect(() => {
        if (search) {
            setCurrentTab(TABS.find(obj => {
                if (typeof obj.href == 'object') {
                    return obj.href.query.tab == search
                }
            }))
        }
        else setCurrentTab(TABS[0])
    }, [search])


    return loading ? <PageLoading /> : (
        <div className="project-container">
            <nav className="tabs">
                {TABS.map(tab => (
                    <Link key={tab.label} href={tab.href} scroll={false}
                        className={`tab flex-center ${tab == currentTab ? 'active' : null}`}
                    >
                        <h2 className="tab-label"> {tab.label} </h2>
                    </Link>
                ))}
            </nav>
            <div className="search-container">
                <input className="search" name="search"
                    placeholder="Search"
                    type="search"
                />
            </div>

            <div className="tab-content">
                {!currentTab ?
                    <div className="loading-container">
                        <ComponentLoading />
                    </div>
                    :
                    <currentTab.component project={currentProject} currentUser={currentUser} />
                }
            </div>
        </div>
    )
}