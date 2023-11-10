import { useState } from "react";
import Sidebar from "@/app/_components/sidebar";
import { useAppSelector } from "@/store/store";

import Menu from "@/assets/svg/menu";
import Close from "@/assets/svg/close";


const Header = () => {
    const pageState = useAppSelector((state) => state.pageReducer)
    const [isHide, setIsHide] = useState(true)


    function showSidebar() {
        setIsHide(!isHide)
    }

    return (
        <header className="header-container">
            <div className='header-content'>
                <button className="sidebar-button" onClick={showSidebar}>
                    {isHide ? <Menu /> : <Close />}
                </button>
                <h1>{pageState.metadata.title ?? 'Dashboard'}</h1>
            </div>
            <Sidebar isHide={isHide} hide={() => setIsHide(true)} />
        </header>
    );
}

export default Header;
