import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";


export async function addDocByCollection(col: any, data: any) {
    try {
        const addedDoc = await addDoc(collection(FIREBASE_DB, col), data)
        return addedDoc.id
    } catch (error) {
        return error
    }
}