import Link from 'next/link'
import { Metadata } from 'next'


export const metadata: Metadata = {
    title: 'Reset your password'
}

const resetPassword = () => {

    return (
        <form className='form'>
            <h1 className='form-title'>Reset your password</h1>
            <p className='form-title' style={{fontFamily: 'FinlandicaRegular'}}>
                Enter your account email address and we will send you a password reset link.
            </p>
            <div className='form-inputs'>
                <input placeholder='Email' type='email' name='email' />
            </div>
            <div className='form-buttons'>
                <button type='submit' className='button-default'>Send</button>
                <div className='divider-horizontal' />
                <Link href='signin'>Back</Link>
            </div>
        </form>
    );
}

export default resetPassword;