'use client'

import { useEffect } from 'react'
import { FIREBASE_AUTH, FIREBASE_DB } from '@/firebase/config'
import { useDispatch } from 'react-redux'
import { logIn, notLogged } from '@/store/features/authSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { useSearchParams } from 'next/navigation'
import { doc, getDoc } from 'firebase/firestore'


export default function App({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams()
    const search = searchParams.get('modal')
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, async (user) => {
            if (!user) dispatch(notLogged())
            else {
                const obj = await getDoc(doc(FIREBASE_DB, 'users', user.uid))
                dispatch(logIn(Object.assign({ uid: user.uid }, obj.data())))
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