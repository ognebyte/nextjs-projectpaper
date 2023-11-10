import { useEffect, useRef, useState } from "react";
import ModalLayout from "./modalLayout";
import { useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { ButtonSubmit } from "@/app/_components/buttons";
import ErrorMessage from "@/app/_components/errorMessage";
import { useAppSelector } from "@/store/store";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";
import moment from "moment";


export default function ModalCreateProject({ isOpen }: { isOpen: boolean }) {
    const currentUser = useAppSelector((state) => state.authReducer.user)
    const modalRef = useRef<any>(null);
    const { replace } = useRouter()
    const [errorStatus, setErrorStatus] = useState(false)
    const [errorText, setErrorText] = useState('')

    useEffect(() => {
        if (!isOpen) return;
        var containsElement = true;
        function handleMouseDown(event: { target: any; }) {
            const e = event.target
            if (!modalRef.current.contains(e)) containsElement = false;
            else containsElement = true;
        }
        function handleMouseUp(event: { target: any; }) {
            const e = event.target
            if (!modalRef.current.contains(e) && !containsElement) replace('?');
            else containsElement = true;
        }
        window.addEventListener("mousedown", handleMouseDown, { capture: true });
        window.addEventListener("mouseup", handleMouseUp, { capture: true });

        return () => {
            window.removeEventListener("mousedown", handleMouseDown, { capture: true })
            window.removeEventListener("mouseup", handleMouseUp, { capture: true })
        }
    }, [isOpen]);

    async function createProject(formData: FormData) {
        let title = (formData.get('title') as string).trim()
        let description = (formData.get('description') as string).trim()
        if (title.length == 0) {
            setErrorText('Title field empty')
            setErrorStatus(true)
            return 0
        }
        try {
            var unixDate = moment().unix()
            const projectRef = await addDoc(
                collection(FIREBASE_DB, 'projects'), {
                    title: title,
                    description: description,
                    createdAt: unixDate,
                    members: [currentUser.uid],
                }
            );
            await setDoc(
                doc(FIREBASE_DB, `users/${currentUser.uid}/projects/${projectRef.id}`), {
                    role: 'admin',
                    joined: unixDate,
                }
            );
            replace(`?`)
        } catch (error) {
            alert('Something went wrong! Please try again later.')
        }
    }

    return (
        <AnimatePresence>
            {!isOpen ? null : (
                <ModalLayout>
                    <div className="modal-container" ref={modalRef}>
                        <form className='form' action={createProject}>
                            <div className='form-inputs'>
                                <input placeholder='Title' type='text' name='title'
                                    className="title" maxLength={20}
                                />
                                <textarea placeholder='Description' name='description'
                                    className="description"
                                />
                                {!errorStatus ? null :
                                    <ErrorMessage onClick={() => setErrorStatus(false)} text={errorText} />
                                }
                            </div>
                            <div className='form-buttons'>
                                <button className="button-secondary" type="button" onClick={() => replace('?')}>
                                    Cancel
                                </button>
                                <ButtonSubmit text={'Create'} />
                            </div>
                        </form>
                    </div>
                </ModalLayout>
            )}
        </AnimatePresence>
    );
}