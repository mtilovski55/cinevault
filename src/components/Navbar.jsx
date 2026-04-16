import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <div className="nav-left">
                <Link to="/" className="logo">CineVault</Link>
            </div>

            <div className="nav-right">
                <Link to="/movies">Movies</Link>
                <Link to="/watchlist">Watchlist</Link>
                <Link to="/create">Add Movie</Link>
                <Link to="/login">Login</Link>
                <Link to="/register" className="btn">Register</Link>
            </div>
        </nav>
    );
}

export default Navbar;