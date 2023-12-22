import { collection, deleteDoc, doc, getDocs, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";

export async function updatedDocProject(projectId: any, project: any) {
    try {
        const projectRef = `projects/${projectId}`
        await updateDoc(doc(FIREBASE_DB, projectRef), project)
        return true
    } catch (error) {
        return false
    }
}

export async function deleteDocProject(projectId: any, project: any) {
    try {
        const projectRef = `projects/${projectId}`
        await Promise.all([
            project.boards.forEach(async (boardId: any) => {
                const q = await getDocs(collection(FIREBASE_DB, projectRef + `/boards/${boardId}/tasks`));
                await Promise.all([
                    q.forEach(doc => deleteDoc(doc.ref)),
                    deleteDoc(doc(FIREBASE_DB, projectRef + `/boards/${boardId}`)),
                ])
            }),
            project.members.forEach(async (userId: any) => {
                await deleteDoc(doc(FIREBASE_DB, `users/${userId}/projects/${projectId}`))
            }),
            await deleteDoc(doc(FIREBASE_DB, projectRef))
        ])
        return true
    } catch (error) {
        return false
    }
}