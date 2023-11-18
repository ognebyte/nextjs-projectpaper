import { Metadata, ResolvingMetadata } from 'next'
import { redirect } from 'next/navigation'
import getDocById from '@/firebase/features/getDoc'


type Props = {
    params: { projectId: string }
    searchParams: { [key: string]: string | string[] | undefined }
}


export async function generateMetadata(
    { params, searchParams }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const project = await getDocById(params.projectId, 'projects')
    if (!project) redirect('/')
    else return {
        title: project.title,
        description: project.description,
    }
}


export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
