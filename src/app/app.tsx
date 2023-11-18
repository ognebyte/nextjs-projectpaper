'use client'

import { useEffect } from 'react'
import { FIREBASE_AUTH } from '@/firebase/config'
import { useDispatch } from 'react-redux'
import { logIn, notLogged } from '@/store/features/authSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { useSearchParams } from 'next/navigation'


export default function App({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams()
    const search = searchParams.get('modal')
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if (!user) dispatch(notLogged())
            else {
                var obj = {
                    username: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photoURL: user.photoURL
                }
                dispatch(logIn(obj))
            }
        })
        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (search) { document.body.style.overflow = "hidden" }
        else { document.body.style.overflow = "" }
    }, [search])


    return children;
};