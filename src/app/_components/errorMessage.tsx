import { ButtonClose } from '@/app/_components/buttons'


export default function ErrorMessage({ onClick, text }: { onClick: () => void, text: string }) {
    return (
        <div className='error-container'>
            <p className='error-message'>{text}</p>
            <ButtonClose onClick={onClick} color='#b4302b' />
        </div>
    );
}
