import type { Metadata, ResolvingMetadata } from 'next'
import { useAppSelector } from '@/store/store'

type Props = {
    params: { id?: string, project?: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params, searchParams }: Props,
parent: ResolvingMetadata
): Promise<Metadata> {
    // const pageMetadata = await fetchData(params.id)
    return {
        title: params.project,
        description: 'pageMetadata.description',
    }
}

export default function ProjectLayout({
    children,
}: {
    children: React.ReactNode
}) {

    return children
}
