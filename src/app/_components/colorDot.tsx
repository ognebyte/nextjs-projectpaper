export default function ColorDot(
    { color, width, height, border = false }: { color: string, width: number, height: number, border?: boolean }
) {
    return (
        <span className={border ? 'gray-border' : ''}
            style={{
                display: 'block',
                backgroundColor: color,
                minWidth: width, maxWidth: width,
                minHeight: height, maxHeight: height,
                borderRadius: '50%'
            }}
        />
    )
}