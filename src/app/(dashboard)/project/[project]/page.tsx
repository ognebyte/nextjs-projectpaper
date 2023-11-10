

export default function Project({ params }: { params: { project: string } }) {
    return <div>My Post: {params.project}</div>
}