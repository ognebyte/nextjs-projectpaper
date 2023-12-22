export default function Tick({ color = '#111111' }) {
    return (
        <svg width="800px" height="800px" viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.5 12.5L10.167 17L19.5 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}