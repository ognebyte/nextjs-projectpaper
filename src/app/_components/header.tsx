import { useEffect, useState } from "react";
import Sidebar from "@/app/_components/sidebar";

import Menu from "@/assets/svg/menu";
import Close from "@/assets/svg/close";
import { usePathname } from "next/navigation";


export default function Header() {
    const currPathname = usePathname()
    const [headerTitle, setHeaderTitle] = useState('')
    const [isHide, setIsHide] = useState(true)

    useEffect(() => {
        setHeaderTitle(document.title)
    }, [currPathname])

    function showSidebar() {
        setIsHide(!isHide)
    }

    return (
        <header className="header-container">
            <div className="header-content">
                <button className="sidebar-button" onClick={showSidebar}>
                    {isHide ? <Menu /> : <Close />}
                </button>
                <button className="title-container" onClick={() => window.scrollTo(0, 0)}>
                    <h2 className="title">{headerTitle}</h2>
                </button>
            </div>
            <Sidebar isHide={isHide} hide={() => setIsHide(true)} />
        </header>
    );
}