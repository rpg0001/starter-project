import { useAuth } from "../hooks/useAuth";

export default function Me() {
    const auth = useAuth();
    return  (
        <div>
            {auth.user ? 
                <div>
                    <h1>My account</h1>
                    <p>Email: {auth.user.email}</p>
                    <p>Username: {auth.user.username}</p>
                </div>
                :
                <div>
                    <p>User is not logged in!</p>
                </div>
            }
        </div>
    )
}