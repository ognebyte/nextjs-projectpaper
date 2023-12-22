import { useFormStatus } from 'react-dom'
import Close from '@/assets/svg/close';
import Trash from '@/assets/svg/trash';


export function ButtonSubmit({ text, disabled = false }: { text: string, disabled?: boolean }) {
    const { pending } = useFormStatus();
    return (
        <button type='submit' className={`button-default ${disabled ? 'disabled' : pending ? 'disabled' : ''}`}
            disabled={disabled && pending}
        >
            {pending ? "Loading..." : text}
        </button>
    );
}

export function ButtonClose({ onClick, color }: { onClick: () => void, color?: string }) {
    return (
        <button type='button' className='close-button' onClick={onClick}>
            <Close color={color} />
        </button>
    );
}

export function ButtonDelete({ onClick, color }: { onClick: () => void, color?: string }) {
    return (
        <button type="button" className="delete-button" onClick={onClick}>
            <Trash color={color} />
        </button>
    );
}