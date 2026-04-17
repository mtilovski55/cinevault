import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    const user =
        storedUser && storedUser !== "undefined"
            ? JSON.parse(storedUser)
            : null;

    const logoutHandler = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    return (
        <nav>
            <div className="nav-left">
                <Link to="/" className="logo">CineVault</Link>
            </div>

            <div className="nav-right">
                <Link to="/movies">Movies</Link>
                {user && <Link to="/watchlist">Watchlist</Link>}
                {user && <Link to="/create">Add Movie</Link>}
                {user && <Link to="/profile">Profile</Link>}

                {user ? (
                    <>
                        <span className="nav-user">Hi, {user.email}</span>
                        <button onClick={logoutHandler} className="btn">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register" className="btn">Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;