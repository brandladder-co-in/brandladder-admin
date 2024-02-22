import React, { useState } from 'react';
import DashBoard from '../../../components/frames/dashboard';
import useEmailAuth from '../../../hooks/auth/useEmailAuth';
import { useFirestore } from '../../../context/FirestoreContext';
import { showSuccessToast, showErrorToast } from '../../../components/tosters/natifications'

const CreateUsers = () => {
    // State variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { handleEmailSignUp } = useEmailAuth();
    const { storeDocId: uploadAdmin } = useFirestore()

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (email !== '' && password !== '') {
                await handleEmailSignUp(email, password)
                await uploadAdmin('admins', email)
                setEmail('')
                setPassword('')
                showSuccessToast('Admin Created')
            }
        } catch (error) {
            console.error('Error while submiting edited blogs: ', error)
            showErrorToast('Something went wrong !!')
        }

    };

    return (
        <DashBoard>
            <div className="flex justify-center items-center h-full">
                <form onSubmit={handleSubmit} className="shadow-xl bg-gray-2 rounded p-12 w-3/4">
                    <h1 className="text-2xl mb-6">Create User</h1>
                    <div className="mb-4">
                        <label className="block text-sm text-white" htmlFor="email">
                            Email:
                        </label>
                        <input
                            className="input-ghost-secondary input shadow appearance-none border rounded max-w-full py-2 px-3 text-secondary leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm text-white" htmlFor="password">
                            Password:
                        </label>
                        <input
                            className="input-ghost-secondary input shadow appearance-none border rounded maxz-w-full py-2 px-3 text-secondary mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            className="btn btn-outline-secondary w-full"
                            type="submit"
                        >
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </DashBoard>
    );
};

export default CreateUsers;
