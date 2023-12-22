import { DocumentData, arrayUnion, collection, deleteDoc, doc, documentId, getDocs, query, updateDoc, where } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";
import { addDocByCollection } from "./addDoc";


export async function addDocBoard(projectId: any, board: any) {
    try {
        const projectRef = `projects/${projectId}`
        const boardId = await addDocByCollection(projectRef + '/boards', board)
        await updateDoc(doc(FIREBASE_DB, projectRef), { boards: arrayUnion(boardId) })
        return true
    } catch (error) {
        return false
    }
}

export async function getCollectionBoards(projectId: any, boards: any) {
    const boardsRef = collection(FIREBASE_DB, `projects/${projectId}/boards`);
    const querySnapshot = await getDocs(query(boardsRef, where(documentId(), "in", boards)));
    var obj: DocumentData = []
    querySnapshot.forEach(doc => {
        obj.push(Object.assign(doc.data(), { id: doc.id }));
    });
    return obj
}


export async function deleteDocBoard(projectId: any, boardId: any, boards: any) {
    const projectRef = `projects/${projectId}`

    var index = boards.indexOf(boardId)
    if (index == -1) return false;
    else {
        boards.splice(index, 1)
        const querySnapshot = await getDocs(collection(FIREBASE_DB, projectRef + `/boards/${boardId}/tasks`));
        await Promise.all([
            querySnapshot.forEach(doc => deleteDoc(doc.ref)),
            updateDoc(doc(FIREBASE_DB, projectRef), { boards: boards }),
            deleteDoc(doc(FIREBASE_DB, projectRef + `/boards/${boardId}`)),
        ])
        return true
    }
}