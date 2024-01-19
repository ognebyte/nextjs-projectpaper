import { DocumentData, arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { getDocById } from "./getDoc";
import { FIREBASE_DB } from "../config";

export async function getProjectMembers(projectId: any, members: any) {
    try {
        var obj: DocumentData[] = []
        await Promise.all(members.map(async (userId: string) => {
            const [user, role] = await Promise.all([
                getDocById(userId, 'users'),
                getDocById(projectId, `users/${userId}/projects`)
            ])
            obj.push(Object.assign({ userId: userId }, user, role))
        }))
        return obj
    } catch (error) {
        return []
    }
}

export async function getProjectRequests(requests: any) {
    try {
        var obj: DocumentData[] = []
        await Promise.all(requests.map(async (id: string) => {
            const user = await getDocById(id, 'users')
            obj.push(Object.assign({ id: id }, user))
        }))
        return obj
    } catch (error) {
        return []
    }
}

export async function removeProjectMember(projectId: any, userId: any) {
    try {
        const projectRef = doc(FIREBASE_DB, `projects/${projectId}`);
        await Promise.all([
            updateDoc(projectRef, { members: arrayRemove(userId) }),
            deleteDoc(doc(FIREBASE_DB, `users/${userId}/projects/${projectId}`))
        ])
        return true
    } catch (error) {
        return false
    }
}