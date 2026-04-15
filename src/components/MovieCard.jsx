import { Link } from "react-router-dom";

function MovieCard({ movie }) {
    return (
        <div className="movie-card">
            <img src={movie.imageUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.genre}</p>
            <p>{movie.year}</p>
            <p>⭐ {movie.rating}/10</p>
            <Link to={`/movies/${movie.id}`}>Details</Link>
        </div>
    );
}

export default MovieCard;