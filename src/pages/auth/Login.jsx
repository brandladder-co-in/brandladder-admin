import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useEmailAuth from '../../hooks/auth/useEmailAuth'

import AuthPageFrames from '../../components/frames/auth'
import LoginForm from '../../components/forms/login'

const Login = () => {

    const navigate = useNavigate()
    const { currentUser } = useEmailAuth();

    useEffect(() => {
        if (currentUser?.uid) {
            navigate('/dashboard');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser?.uid])

    return (
        <AuthPageFrames>
            <div className="my-10">
                <LoginForm />
            </div>
        </AuthPageFrames>
    )
}

export default Login
