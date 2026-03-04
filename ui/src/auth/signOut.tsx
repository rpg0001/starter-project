import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function SignOut() {
    const auth = useAuth();
    
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    async function handleSignOut() {
        try {
            setIsLoading(true);
            await auth.postSignOut()
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            console.error(error.message);
            setErrorMessage("Failed to sign out, please try again");
            return;
        }
    }
    
    return <>
        {!isLoading && <button onClick={() => handleSignOut()}>Sign Out</button>}
        {isLoading && <p>Signing out...</p>}
        {errorMessage && <p>{errorMessage}</p>}
    </>;
}