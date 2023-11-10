import { motion } from "framer-motion";


export default function ModalLayout ({
    children,
}: {
    children: React.ReactNode
}) {
    const motionDiv = {
        initial: { opacity: 0, scale: 1.1 },
        animate: { opacity: 1, scale: 1 },
        transition: {
            duration: 0.1,
            ease: 'easeInOut',
        },
    }
    return (
        <motion.div className="modal-layout"
            initial={motionDiv.initial}
            animate={motionDiv.animate}
            exit={motionDiv.initial}
            transition={motionDiv.transition}
        >
            {children}
        </motion.div>
    );
}