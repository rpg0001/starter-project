import { Outlet, Link } from "react-router-dom";

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
                </ul>
            </nav>
        </header>

        <main>
            <Outlet />
        </main>
    </>
  )
};