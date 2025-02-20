import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/app/_components/sidebar";
import Menu from "@/assets/svg/menu";
import Close from "@/assets/svg/close";


export default function Header() {
    const pathname = usePathname()
    const [headerTitle, setHeaderTitle] = useState('')
    const [isHide, setIsHide] = useState(true)

    useEffect(() => {
        setHeaderTitle(document.title)
    }, [pathname])

    function showSidebar() {
        setIsHide(!isHide)
    }

    return (
        <header className="header-container">
            <div className="header-content">
                <button className="sidebar-button" onClick={showSidebar}>
                    {isHide ? <Menu /> : <Close />}
                </button>
                <div className="title-container">
                    <h2 className="title">{headerTitle}</h2>
                </div>
            </div>
            <Sidebar isHide={isHide} hide={() => setIsHide(true)} />
        </header>
    );
}