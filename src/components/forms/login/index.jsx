import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import useEmailAuth from '../../../hooks/auth/useEmailAuth';
import { showSuccessToast, showErrorToast } from '../../tosters/natifications';

const LoginForm = () => {

    // reg email and pass
    // demo@demo.com
    // demo1234
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [userID, setuserID] = useState('')
    const [showPass, setShowPass] = useState(false);

    const navigate = useNavigate();
    const { handleEmailSignUp, currentUser } = useEmailAuth();

    const handleEmailLogin = async () => {

        try {
            setLoading(true)

            if (email !== '' && password !== '') {
                const res = await handleEmailSignUp(email, password);

                setuserID(res.user.uid)
                console.log('res: ', res?.user?.uid)
                console.log('currentUser: ', currentUser)

                if (userID !== '') {
                    navigate('/dashbaord')
                }

                showSuccessToast(`Login Succesfully`)
            } else {
                showErrorToast('All Firelds are required !!')
            }

        } catch (error) {
            console.error("Email sign-in error:", error);
            setLoading(false)
            showErrorToast("Email and password not matching")
        } finally {
            setLoading(false)
        }
    };

    const togglePasswordVisibility = () => {
        try {
            setShowPass(!showPass);
        } catch (error) {
            console.error('Error while show password: ', error);
        }
    }

    return (
        <aside className="flex flex-col items-center">
            <input
                className="input-ghost-secondary input my-2 max-w-full text-secondary"
                placeholder="Email"
                type='email'
                value={email}
                onChange={(value) => { setEmail(value.target.value) }}
            />
            <div className='flex w-full'>
                <input
                    className="input-ghost-secondary input  my-2 max-w-full text-secondary"
                    placeholder="Password"
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(value) => { setPassword(value.target.value) }}
                />
                <button className='border-none px-4 py-2 text-black my-auto' onClick={togglePasswordVisibility}>
                    {showPass ? <IoEyeOutline className='my-auto' /> : <IoEyeOffOutline className='my-auto' />}
                </button>
            </div>

            {
                loading ? (
                    <button
                        className="btn btn-secondary w-full mt-2"
                    >
                        Loading ...
                    </button>
                ) : (
                    <button
                        className="btn btn-secondary w-full mt-2"
                        onClick={handleEmailLogin}
                    >
                        Login
                    </button>
                )
            }

            <small className='text-black' >
                Not registered with us ?
                <Link to='/teacher-register' className='text-blue-600'>create now</Link>
            </small>
        </aside>
    )
}

export default LoginForm
