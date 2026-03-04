import { Outlet, Link } from "react-router-dom";
import './Layout.css';
import { AuthContextType, useAuth } from "../hooks/useAuth";
import { useState } from "react";

export default function Layout() {
    const auth = useAuth();
    
    return (
        <>
            <header>
                <nav className="auth-navbar">
                    {auth.user ? 
                        <ul>
                            <li>
                                <SignOut auth={auth} />
                            </li>
                            <li>
                                <Link to="/auth/me">Account</Link>
                            </li>
                        </ul>
                        :
                        <ul>
                            <li>
                                <Link to="/auth/signin">Sign in</Link>
                            </li>
                            |
                            <li>
                                <Link to="/auth/signup">Sign up</Link>
                            </li>
                        </ul>
                    }
                </nav>
                <nav className="main-navbar">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        
                        {auth.user ?
                            <>
                                <li>
                                    <Link to="/notes">Notes</Link>
                                </li>
                                <li>
                                    <Link to="/notes/create">Create Note</Link>
                                </li>
                            </> 
                            :
                            null
                        }
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </>
    )
};

function SignOut(props: { auth: AuthContextType }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    async function handleSignOut() {
        try {
            setIsLoading(true);
            await props.auth.postSignOut()
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