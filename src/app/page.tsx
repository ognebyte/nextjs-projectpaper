'use client'

// import styles from './page.module.css'
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebase/config';
import { useAppSelector } from '@/store/store'


export default function Home() {
    const currentUser = useAppSelector((state) => state.authReducer.value)

    if(!currentUser.isAuth) return null

    return (
        <div className='App'>
            <p> Hello world </p>
            <button onClick={async () => await signOut(FIREBASE_AUTH)}>Log out</button>
            <Link href='/signin'>Signin</Link>
            <Link href='/signup'>Signup</Link>
        </div>
    )
}
