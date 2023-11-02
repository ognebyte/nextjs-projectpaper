'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebase/config'
import { ButtonSubmit, ButtonClose } from '@/app/_components/buttons'
import ErrorMessage from '@/app/_components/errorMessage';


const SignIn = () => {
    const [errorStatus, setErrorStatus] = useState(false)
    const [errorText, setErrorText] = useState('')
    const router = useRouter()

    async function signIn(formData: FormData) {
        let email = formData.get('email') as string
        let password = formData.get('password') as string
        if (email.length == 0 || password.length == 0) {
            setErrorText('Not all fields are filled')
            setErrorStatus(true)
            return 0
        }
        await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then(() => router.push('/'))
            .catch(error => {
                setErrorText('Your email or password was incorrect')
                setErrorStatus(true)
            })
    }

    return (
        <form className='form' action={signIn}>
            <h1 className='form-title'>Sign in</h1>
            <div className='form-inputs'>
                <input placeholder='Email' type='email' name='email' autoComplete='on' />
                <input placeholder='Password' type='password' name='password' autoComplete='on' />
                <Link href='/resetPassword' style={{ marginLeft: 'auto', fontSize: '0.8rem' }}>Forgot password?</Link>
                {!errorStatus ? null :
                    <ErrorMessage onClick={() => setErrorStatus(false)} text={errorText} />
                }
            </div>
            <div className='form-buttons'>
                <ButtonSubmit text={'Sign In'} />
                <div className='divider-horizontal' />
                <Link href='/signup'>Create an account</Link>
            </div>
        </form>
    );
}

export default SignIn;