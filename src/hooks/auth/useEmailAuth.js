import { useAuth } from "../../context/AuthContext";

function useEmailAuth() {
    const {
        currentUser,
        error,
        clearError,
        signUp,
        signIn,
        signOut,
    } = useAuth();

    const handleEmailSignUp = async (email, password) => {
        clearError();
        try {
            const res = await signUp(email, password);
            return res;
        } catch (error) {
            console.error("Email sign-up error:", error);
        }
    };

    const handleEmailSignIn = async (email, password) => {
        try {
            const res = await signIn(email, password);
            return res;
        } catch (error) {
            console.error("Email sign-in error:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            const res = await signOut();
            return res;
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return {
        currentUser,
        handleEmailSignUp,
        handleEmailSignIn,
        handleSignOut,
        error
    };
}

export default useEmailAuth;
