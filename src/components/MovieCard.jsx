import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    addToWatchlist,
    getWatchlist,
    removeFromWatchlist,
    markAsWatched
} from "../services/movieService";

function MovieCard({
    movie,
    showWatchlistButton = true,
    showRemoveButton = false,
    showWatchedButton = false,
    onRemove,
    onWatchedToggle
}) {
    const [isAdded, setIsAdded] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        if (!showWatchlistButton) {
            return;
        }

        if (!user) {
            setIsAdded(false);
            return;
        }

        getWatchlist().then((list) => {
            const exists = list.some(
                (item) =>
                    String(item.movieId) === String(movie.id) &&
                    String(item.userId) === String(user.id)
            );
            setIsAdded(exists);
        });
    }, [movie.id, showWatchlistButton, user]);

    const addHandler = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        await addToWatchlist(movie);
        setIsAdded(true);
    };

    const removeHandler = async () => {
        await removeFromWatchlist(movie.id);

        if (onRemove) {
            onRemove(movie.id);
        }
    };

    const watchedHandler = async () => {
        const updatedMovie = await markAsWatched(movie);

        if (onWatchedToggle) {
            onWatchedToggle(updatedMovie);
        }
    };

    return (
        <div className={`movie-card ${movie.watched ? "watched-card" : ""}`}>
            <img src={movie.imageUrl} alt={movie.title} />
            <h3>{movie.title}</h3>
            <p>{movie.genre}</p>
            <p>{movie.year}</p>
            <p>⭐ {movie.rating}/10</p>

            {movie.watched && <p className="watched-badge">Watched ✓</p>}

            <div className="movie-card-actions">
                <Link to={`/movies/${movie.movieId || movie.id}`}>Details</Link>

                {showWatchlistButton &&
                    (user ? (
                        isAdded ? (
                            <button className="btn-secondary" disabled>
                                Added ✓
                            </button>
                        ) : (
                            <button onClick={addHandler} className="btn-secondary">
                                Add to Watchlist
                            </button>
                        )
                    ) : (
                        <button onClick={addHandler} className="btn-secondary">
                            Login to Save
                        </button>
                    ))}

                {showWatchedButton && (
                    <button onClick={watchedHandler} className="btn-secondary">
                        {movie.watched ? "Unwatch" : "Mark as Watched"}
                    </button>
                )}

                {showRemoveButton && (
                    <button onClick={removeHandler} className="btn-secondary">
                        Remove
                    </button>
                )}
            </div>
        </div>
    );
}

export default MovieCard;