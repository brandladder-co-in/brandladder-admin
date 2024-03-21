import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { useFirestore } from '../../../context/FirestoreContext'
import useEmailAuth from '../../../hooks/auth/useEmailAuth';
import { showSuccessToast, showErrorToast } from '../../tosters/natifications';

const LoginForm = () => {

    // reg email and pass
    // demo@demo.com
    // demo1234
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [adminList, setAdminList] = useState([]);

    const navigate = useNavigate();
    const { getAllDocIds: fetchALLAdmins } = useFirestore();
    const { handleEmailSignUp } = useEmailAuth();

    const handleEmailLogin = async () => {
        try {
            setLoading(true);

            if (email !== '' && password !== '') {
                // Linear search to check if email is in adminList
                let found = false;
                for (const adminEmail of adminList) {
                    if (adminEmail === email) {
                        found = true;
                        break;
                    }
                }

                if (found) {
                    await handleEmailSignUp(email, password);
                    navigate('/dashboard/add-blogs');
                    showSuccessToast(`Login Successfully`);
                } else {
                    showErrorToast(`Email not authorized`);
                }
            } else {
                showErrorToast('All Fields are required !!');
            }
        } catch (error) {
            console.error("Email sign-in error:", error);
            showErrorToast("Email and password not matching");
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        try {
            setShowPass(!showPass);
        } catch (error) {
            console.error('Error while show password: ', error);
        }
    }

    useEffect(() => {

        const handleAllAdmins = async () => {
            try {
                const res = await fetchALLAdmins('admins');
                setAdminList(res)
            } catch (error) {
                console.error('Error while fetching all admins: ', error);
            }
        }


        handleAllAdmins();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

            {/* <small className='text-black' >
                Not registered with us ?
                <Link to='/teacher-register' className='text-blue-600'>create now</Link>
            </small> */}
        </aside>
    )
}

export default LoginForm
