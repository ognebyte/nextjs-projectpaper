import { arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";
import { setDocById } from "./setDoc";
import { addDocByCollection } from "./addDoc";


export async function addDocTask(projectId: any, boardId: any, updatedTask: any) {
    try {
        const boardRef = `projects/${projectId}/boards/${boardId}/`
        const taskId = await addDocByCollection(boardRef + `tasks`, updatedTask)
        await updateDoc(doc(FIREBASE_DB, boardRef), { tasks: arrayUnion(taskId) })
        return true
    } catch (error) {
        return false
    }
}

export async function deleteDocTask(projectId: any, boardId: any, taskId: any, boards: any) {
    const boardRef = `projects/${projectId}/boards/${boardId}/`

    var tasks = boards.find((el: any) => el.id == boardId).tasks
    var index = tasks.indexOf(taskId)
    if (index == -1) return false;
    else {
        tasks.splice(index, 1)
        await Promise.all([
            updateDoc(doc(FIREBASE_DB, boardRef), {tasks: tasks}),
            deleteDoc(doc(FIREBASE_DB, boardRef + `tasks/${taskId}`))
        ])
        return true
    }
}