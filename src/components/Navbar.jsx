import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/movies">Movies</Link> |{" "}
            <Link to="/watchlist">Watchlist</Link> |{" "}
            <Link to="/create">Add Movie</Link> |{" "}
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link>
        </nav>
    );
}

export default Navbar;