import Link from 'next/link'
import { Metadata } from 'next'
 

export const metadata: Metadata = {
    title: 'Sign In'
}

const SignIn = () => {

    return (
        <form className='form'>
            <h1 className='form-title'>Sign in</h1>
            <div className='form-inputs'>
                <input placeholder='Email' type='email' name='email'/>
                <input placeholder='Password' type='password' name='password'/>
                <Link href='resetPassword' style={{width: 'auto', fontSize: '0.8rem'}}>Forgot password?</Link>
            </div>
            <div className='form-buttons'>
                <button type='submit' className='button-default'>Sign in</button>
                <div className='divider-horizontal'/>
                <Link href='signup'>Create an account</Link>
            </div>
        </form>
    );
}

export default SignIn;