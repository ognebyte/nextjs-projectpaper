import Link from 'next/link'
import { Metadata } from 'next'
 

export const metadata: Metadata = {
    title: 'Sign Up'
}

const SignUp = () => {

    return (
        <form className='form'>
            <h1 className='form-title'>Create new account</h1>
            <div className='form-inputs'>
                <input placeholder='Name' type='text' name='name' />
                <input placeholder='Email' type='email' name='email' />
                <input placeholder='Password' type='password' name='password' />
            </div>
            <div className='form-buttons'>
                <button type='submit' className='button-default'>Sign up</button>
                <div className='divider-horizontal' />
                <Link href='signin'>Login in exist account</Link>
            </div>
        </form>
    );
}

export default SignUp;