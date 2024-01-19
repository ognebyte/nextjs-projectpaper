import { Metadata, ResolvingMetadata } from "next";
import { getDocById } from "@/firebase/features/getDoc";
import Project from "./project";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { FIREBASE_DB } from "@/firebase/config";


type Props = {
    params: { projectId: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const project = await getDocById(params.projectId, 'projects')
    return !project ? {} : {
        title: project.title,
        description: project.description,
    }
}


export default async function ProjectLayout({
    children, params
}: {
    children: React.ReactNode, params: { projectId: string }
}) {
    async function sendRequest(projectId: any, userId: any) {
        'use server'
        try {
            await updateDoc(doc(FIREBASE_DB, `projects/${projectId}`), { requestsToJoin: arrayUnion(userId)})
            return true
        } catch (error) {
            return false
        }
    }

    return <Project children={children} params={params} sendRequest={sendRequest}/>
}
