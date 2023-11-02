'use client'

import { useState } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FIREBASE_AUTH } from '@/firebase/config'
import { ButtonSubmit } from '@/app/_components/buttons'
import ErrorMessage from '@/app/_components/errorMessage';


const SignUp = () => {
    const [errorStatus, setErrorStatus] = useState(false)
    const [errorText, setErrorText] = useState('')
    const router = useRouter()


    async function signUp(formData: FormData) {
        let username = formData.get('username') as string
        let email = formData.get('email') as string
        let password = formData.get('password') as string
        if (username.length == 0 || email.length == 0 || password.length == 0) {
            setErrorText('Not all fields are filled')
            setErrorStatus(true)
            return 0
        }
        await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then(async (userDoc) => {
                await updateProfile(userDoc.user, { displayName: username })
                router.push('/')
            })
            .catch(error => {
                setErrorText('Your username, email or password was incorrect')
                setErrorStatus(true)
            });
    }

    return (
        <form className='form' action={signUp}>
            <h1 className='form-title'>Create new account</h1>
            <div className='form-inputs'>
                <input placeholder='Username' type='text' name='username' autoComplete='off' />
                <input placeholder='Email' type='email' name='email' autoComplete='on' />
                <input placeholder='Password' type='password' name='password' autoComplete='on' />
                {!errorStatus ? null :
                    <ErrorMessage onClick={() => setErrorStatus(false)} text={errorText} />
                }
            </div>
            <div className='form-buttons'>
                <ButtonSubmit text={'Sign up'} />
                <div className='divider-horizontal' />
                <Link href='/signin'>Login in exist account</Link>
            </div>
        </form>
    );
}

export default SignUp;