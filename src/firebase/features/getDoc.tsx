import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";


export async function getDocById(id: string, findIn: string) {
    const docSnap = await getDoc(doc(FIREBASE_DB, findIn, id))
    if (docSnap.exists()) {
        return Object.assign(docSnap.data(), { id: docSnap.id })
    }
    return null
}