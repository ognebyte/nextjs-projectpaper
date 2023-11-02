'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { FIREBASE_AUTH } from '@/firebase/config'
import { useDispatch } from 'react-redux'
import { logIn, logOut, notLogged } from '@/store/features/authSlice'
import { useAuthState } from 'react-firebase-hooks/auth';


export default function App({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch()
    const { push } = useRouter()
    const [user, loading, error] = useAuthState(FIREBASE_AUTH)

    useEffect(() => {
        if (!loading) {
            if (user == null) {
                dispatch(notLogged())
                push('/signin')
            }
            else {
                dispatch(logIn({
                    username: user.displayName as string,
                    uid: user.uid,
                }))
            }
        }
    }, [user, loading, error])

    return children;
};