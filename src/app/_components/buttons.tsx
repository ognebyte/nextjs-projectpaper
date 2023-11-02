import { useFormStatus } from 'react-dom'
import Close from '@/assets/svg/close';


export function ButtonSubmit({ text }: { text: string }) {
    const { pending } = useFormStatus();
    return (
        <button type='submit' className={`button-default ${pending ? 'disabled' : ''}`}
            disabled={pending}
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