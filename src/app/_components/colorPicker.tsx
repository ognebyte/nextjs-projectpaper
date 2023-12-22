import React from "react"

const COLORS = ['#E7E7E7', '#8AB4F8', '#F28B82', '#FDD663', '#81C995', '#FF8BCB', '#C58AF9', '#FCAD70', '#78D9EC']

export default function ColorPicker({ defaultValue = '#E7E7E7', onChange }: { defaultValue?: string, onChange: any }) {
    return (
        <div className="color-picker">
            {COLORS.map(color =>
                <input type="radio" name="color" className="color"
                    key={`color-${color}`} value={color}
                    defaultChecked={color == defaultValue}
                    style={{ backgroundColor: color }}
                    onChange={onChange}
                    required
                />
            )}
        </div>
    )
}