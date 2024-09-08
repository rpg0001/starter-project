import { Outlet, Link } from "react-router-dom";
import './Layout.css';

export default function Layout() {
  return (
    <>
        <header>
            <nav className="main-navbar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/notes">Notes</Link>
                    </li>
                    <li>
                        <Link to="/notes/create">Create Note</Link>
                    </li>
                </ul>
            </nav>
        </header>

        <main>
            <Outlet />
        </main>
    </>
  )
};