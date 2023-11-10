'use client'

import { useEffect } from 'react'
import { FIREBASE_AUTH } from '@/firebase/config'
import { useDispatch } from 'react-redux'
import { logIn, logOut, notLogged } from '@/store/features/authSlice'
import { onAuthStateChanged } from 'firebase/auth'


export default function App({ children }: { children: React.ReactNode }) {
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

    return children;
};