import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { PageLoading } from "../loadings";

const ModalCreateProject = dynamic(() => import('./modalCreateProject'), { loading: () => <PageLoading /> })
const ModalCreateTask = dynamic(() => import('./modalCreateTask'), { loading: () => <PageLoading /> })


type modalsType = { [propKey: string]: any };

const modals: modalsType = {
    createProject: ModalCreateProject,
    createTask: ModalCreateTask,
};


export default function ModalLayout({ modalParam }: { modalParam: any }) {
    const modalRef = useRef<any>(null);
    const [modal, setModal] = useState<any>()
    const { replace } = useRouter()


    useEffect(() => {
        if (!modalParam) return
        let comp = modals[modalParam]
        if (!comp) return
        setModal(modals[modalParam])
        var containsElement = true;
        function handleMouseDown(event: { target: any; }) {
            const e = event.target
            if (!modalRef.current.contains(e)) containsElement = false;
            else containsElement = true;
        }
        function handleMouseUp(event: { target: any; }) {
            const e = event.target
            if (!modalRef.current.contains(e) && !containsElement) replace('?', { scroll: false });
            else containsElement = true;
        }
        window.addEventListener("mousedown", handleMouseDown, { capture: true });
        window.addEventListener("mouseup", handleMouseUp, { capture: true });

        return () => {
            setModal(false)
            window.removeEventListener("mousedown", handleMouseDown, { capture: true })
            window.removeEventListener("mouseup", handleMouseUp, { capture: true })
        }
    }, [modalParam])


    const motionDiv = {
        initial: { opacity: 0, scale: 1.1 },
        animate: { opacity: 1, scale: 1 },
        transition: {
            duration: 0.1,
            ease: 'easeInOut',
        },
    }

    return (
        <AnimatePresence>
            {!modal ? null :
                <motion.div className="modal-layout"
                    initial={motionDiv.initial}
                    animate={motionDiv.animate}
                    exit={motionDiv.initial}
                    transition={motionDiv.transition}
                >
                    <div className="modal-container" ref={modalRef}>
                        {modal}
                    </div>
                </motion.div>
            }
        </AnimatePresence>
    );
}