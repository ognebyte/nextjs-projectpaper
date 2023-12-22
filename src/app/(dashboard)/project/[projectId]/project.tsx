'use client'

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useAppSelector } from "@/store/store"
import { doc, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";
import { useDispatch } from "react-redux";
import { setProject } from "@/store/features/projectSlice";
import { PageLoading } from "@/app/_components/loadings";
import { ButtonSubmit } from "@/app/_components/buttons";
import Logo from "@/assets/svg/logo";
import ColorDot from "@/app/_components/colorDot";


const TABS = [
    { label: 'Overview', href: '' },
    { label: 'Tasks', href: '/tasks' },
    { label: 'Members', href: '/members' },
    { label: 'Settings', href: '/settings' },
]

export default function Project({ children, params, sendRequest }: { children: React.ReactNode, params: any, sendRequest: any }) {
    const dispatch = useDispatch()
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const currentProject = useAppSelector((state) => state.projectReducer)
    const pathname = usePathname()
    const { push, replace } = useRouter()
    const projectPath = `/project/${params.projectId}`
    const [isMember, setIsMember] = useState(false);
    const [currentTab, setCurrentTab] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        var tab = pathname.replace(projectPath, '')
        setCurrentTab(tab)
    }, [pathname])

    useEffect(() => {
        const projectDoc = doc(FIREBASE_DB, 'projects', params.projectId);
        const unsubscribe = onSnapshot(projectDoc, (snap) => {
            if (!snap.exists()) replace('/')
            else {
                var projectObj = Object.assign({ id: snap.id }, snap.data())
                let memberInclude = projectObj.members.includes(currentUser.uid)
                if (!memberInclude && !projectObj.requests) replace('/')
                else {
                    dispatch(setProject(projectObj))
                    setIsMember(memberInclude)
                    setLoading(false)
                }
            }
        });
        return () => unsubscribe()
    }, [])

    async function handleSubmit() {
        if (await sendRequest(currentProject.id, currentUser.uid))
            alert('Request send')
        else
            alert('Something went wrong! Please try again later.')

    }

    return loading ? <PageLoading /> : !isMember ?
        <div className="project-request flex-center">
            <form className="form" action={handleSubmit}>
                <div className="logo"><Logo /></div>
                <div className="info">
                    <div className="title">
                        <h2>{currentProject.title}</h2>
                        <ColorDot width={16} height={16} color={currentProject.color} border={true} />
                    </div>
                    <p className="members">Members: {currentProject.members.length}</p>
                </div>
                <div className="buttons">
                    {currentProject.requestsToJoin.includes(currentUser.uid as string) ?
                        <ButtonSubmit disabled={true} text="Request sent" />
                        :
                        <ButtonSubmit text="Request to Join" />
                    }
                    <Link href='/'>Back</Link>
                </div>
            </form>
        </div>
        :
        <div className="project-container">
            <nav className="tabs">
                {TABS.map(tab => (
                    <Link key={tab.label} href={projectPath + tab.href} 
                        className={`tab flex-center ${tab.href == currentTab ? 'active' : ''}`}
                    >
                        <p className="tab-label">{tab.label}</p>
                    </Link>
                ))}
                {currentProject.requestsToJoin.length == 0 ? null :
                    <Link href='?modal=requests' scroll={false} className='tab flex-center' style={{ marginLeft: 'auto' }}>
                        <p className="tab-label">Requests ({currentProject.requestsToJoin.length})</p>
                    </Link>
                }
            </nav>

            {/*
            <div className="search-container">
                <input className="search" name="search"
                    placeholder="Search"
                    type="search"
                />
            </div>
            */}

            <div className="tab-content">
                {children}
            </div>
        </div>
}