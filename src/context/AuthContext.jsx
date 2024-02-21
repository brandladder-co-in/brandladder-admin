import React, { useContext, useState, useEffect } from "react";

import { auth } from "../config/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    // updateProfile,
} from 'firebase/auth';
import "firebase/app";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    let [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);

    const clearError = () => setError(null);

    // create new user
    const signIn = async (email, password) => {
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            clearError();
            return res;
        } catch (error) {
            setError(error.message);
            console.log('Error while creating new user: ', error)
        }
    };


    // email signup
    const signUp = async (email, password) => {
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            clearError();
            return res;
        } catch (error) {
            setError(error.message);
        }
    };

    // google signin
    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const res = await signInWithPopup(auth, provider);
            clearError();
            return res;
        } catch (error) {
            setError(error.message);
        }
    };

    // signout
    const signOutUser = async () => {
        try {
            const res = await signOut(auth);
            setCurrentUser(null)
            clearError();
            return res;
        } catch (error) {
            setError(error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser,
        signUp,
        signIn,
        signInWithGoogle,
        signOut: signOutUser,
        error,
        clearError,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
