import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div>
            Welcome!
            <Link to="/notes">Notes</Link>
        </div>
    )
}