
const COLORS = [
    { value: '#E7E7E7', defaultChecked: true },
    { value: '#8AB4F8' },
    { value: '#F28B82' },
    { value: '#FDD663' },
    { value: '#81C995' },
    { value: '#FF8BCB' },
    { value: '#C58AF9' },
    { value: '#FCAD70' },
    { value: '#78D9EC' },
]

export default function ColorPicker() {
    return (
        <div className="color-picker">
            {COLORS.map(color =>
                <input type="radio" name="color" className="color"
                    key={`color-${color.value}`} value={color.value}
                    defaultChecked={color.defaultChecked}
                    style={{ backgroundColor: color.value }}
                />
            )}
        </div>
    )
}