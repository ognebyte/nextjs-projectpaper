import { doc, getDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";


export default async function getDocById(id: string, findIn: string) {
    const docSnap = await getDoc(doc(FIREBASE_DB, findIn, id))
    if (docSnap.exists()) {
        return docSnap.data()
    }
    return null
}