
import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_AUTH } from "@/firebase/config";


export default async function getUser(id: string) {
    const user = FIREBASE_AUTH.currentUser

    if (user) {
        console.log(user)
    } else {
        console.log('user')
    }
}