'use client'
import { signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "@/firebase/config";
import { useRouter } from 'next/navigation'


export default async function LogOut() {
    const { push } = useRouter()
    await signOut(FIREBASE_AUTH)
        .then(() => push('/signin'))
        .catch(error => push('/'))
}