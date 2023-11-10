export default function TripleRight({ color = '#111111' }) {
    return (
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M171 550L304 400L171 250" stroke={color} strokeWidth="50" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M334 550L466 400L334 250" stroke={color} strokeWidth="50" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M496 550L629 400L496 250" stroke={color} strokeWidth="50" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}