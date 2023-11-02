'use client'

import { useState } from 'react';
import Link from 'next/link'
import { sendPasswordResetEmail } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebase/config'
import { ButtonSubmit } from '@/app/_components/buttons'
import ErrorMessage from '@/app/_components/errorMessage';


const ResetPassword = () => {
    const [errorStatus, setErrorStatus] = useState(false)
    const [errorText, setErrorText] = useState('')

    async function sendMessage(formData: FormData) {
        let email = formData.get('email') as string
        if (email.length == 0) {
            setErrorText('Enter your email')
            setErrorStatus(true)
            return 0
        }
        await sendPasswordResetEmail(FIREBASE_AUTH, email)
            .then(() => {
                alert('Password reset request sent!')
                setErrorStatus(false)
            })
            .catch(error => {
                setErrorText('Your email was incorrect')
                setErrorStatus(true)
            });
    }

    return (
        <form className='form' action={sendMessage}>
            <h1 className='form-title'>Reset your password</h1>
            <p className='form-title' style={{ fontFamily: 'FinlandicaRegular' }}>
                Enter your account email address and we will send you a password reset link.
            </p>
            <div className='form-inputs'>
                <input placeholder='Email' type='email' name='email' autoComplete='on' />
                {!errorStatus ? null :
                    <ErrorMessage onClick={() => setErrorStatus(false)} text={errorText} />
                }
            </div>
            <div className='form-buttons'>
                <ButtonSubmit text={'Send'} />
                <div className='divider-horizontal' />
                <Link href='/signin'>Back</Link>
            </div>
        </form>
    );
}

export default ResetPassword;