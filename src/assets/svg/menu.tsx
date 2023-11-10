export default function Menu({ color = '#111111' }) {
    return (
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M600 530H399.399H200" stroke={color} strokeWidth="50" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M600 400H396.997H200" stroke={color} strokeWidth="50" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M600 270H400.601H200" stroke={color} strokeWidth="50" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}
