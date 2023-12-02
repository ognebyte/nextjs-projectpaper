import { doc, setDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";


export async function setDocById(id: any, data: any) {
    try {
        await setDoc(doc(FIREBASE_DB, id), data)
        return true
    } catch (error) {
        return error
    }
}