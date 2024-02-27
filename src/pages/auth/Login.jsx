import React from 'react';

import AuthPageFrames from '../../components/frames/auth'
import LoginForm from '../../components/forms/login'

const Login = () => {

    return (
        <AuthPageFrames>
            <div className="my-10">
                <LoginForm />
            </div>
        </AuthPageFrames>
    )
}

export default Login
