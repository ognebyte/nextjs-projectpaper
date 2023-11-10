import { useEffect, useRef } from "react";
import { useAppSelector } from "@/store/store";
import Image from "next/image";
import Link from "next/link";

import Projects from "@/assets/svg/projects";
import ProjectPlus from "@/assets/svg/project-plus";
import LogOut from "@/assets/svg/log-out";

const NAVIGATIONS = [
    { key: 'nav-project', label: 'Projects', icon: <Projects />, href: '/' },
    { key: 'nav-create-project', label: 'Create project', icon: <ProjectPlus />, href: { query: { modal: 'createProject' } } },
    { key: 'nav-logout', label: 'Log out', icon: <LogOut color='#b4302b' />, href: '/logout', color: '#b4302b' },
]

export default function Sidebar({ isHide, hide }: { isHide: boolean, hide: any }) {
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const sidebarRef = useRef<any>(null);

    useEffect(() => {
        if (isHide) return;
        function handleMouseDown(event: { target: any; }) {
            const e = event.target
            if (!sidebarRef.current.contains(e)) hide()
        }
        window.addEventListener("mousedown", handleMouseDown, { capture: true });

        return () => window.removeEventListener("mousedown", handleMouseDown, { capture: true })
    }, [isHide]);


    return (isHide ? null :
        <div className="sidebar-container box-shadow" ref={sidebarRef}>
            <p className="email"> {currentUser.email} </p>
            <div className="profile">
                <div className="photo">
                    {!currentUser.photoURL ? '🙂' :
                        <Image src={currentUser.photoURL} alt="profile-photo" fill />
                    }
                </div>
                <p className="username"> {currentUser.username} </p>
            </div>

            <nav className="action-container">
                {NAVIGATIONS.map(nav => (
                    <Link key={nav.key} className="action" href={nav.href} onClick={hide}
                        style={{ color: nav.color }}
                    >
                        {nav.icon} {nav.label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}