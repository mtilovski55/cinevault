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
    onWatchedToggle,
    onGenreClick,
    selectedGenre
}) {
    const [isAdded, setIsAdded] = useState(false);
    const navigate = useNavigate();

    const storedUser = localStorage.getItem("user");
    const user =
        storedUser && storedUser !== "undefined"
            ? JSON.parse(storedUser)
            : null;

    useEffect(() => {
        if (!showWatchlistButton) {
            return;
        }

        if (!user) {
            setIsAdded(false);
            return;
        }

        getWatchlist()
            .then((list) => {
                const exists = list.some(
                    (item) =>
                        String(item.movieId) === String(movie.id) &&
                        String(item.userId) === String(user.id)
                );
                setIsAdded(exists);
            })
            .catch(() => {
                setIsAdded(false);
            });
    }, [movie.id, showWatchlistButton, user]);

    const addHandler = async () => {
        if (!user) {
            navigate("/login");
            return;
        }

        try {
            const result = await addToWatchlist(movie);

            if (result) {
                setIsAdded(true);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const removeHandler = async () => {
        try {
            await removeFromWatchlist(movie.id);

            if (onRemove) {
                onRemove(movie.id);
            }

            setIsAdded(false);
        } catch (error) {
            console.log(error);
        }
    };

    const watchedHandler = async () => {
        try {
            const updatedMovie = await markAsWatched(movie.id, !movie.watched);

            if (onWatchedToggle) {
                onWatchedToggle(updatedMovie);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getGenreStyle = (genre) => {
        const colors = [
            { bg: "rgba(239, 68, 68, 0.15)", color: "#ef4444", border: "#ef4444", glow: "rgba(239, 68, 68, 0.35)" },
            { bg: "rgba(59, 130, 246, 0.15)", color: "#3b82f6", border: "#3b82f6", glow: "rgba(59, 130, 246, 0.35)" },
            { bg: "rgba(168, 85, 247, 0.15)", color: "#a855f7", border: "#a855f7", glow: "rgba(168, 85, 247, 0.35)" },
            { bg: "rgba(234, 179, 8, 0.15)", color: "#eab308", border: "#eab308", glow: "rgba(234, 179, 8, 0.35)" },
            { bg: "rgba(34, 197, 94, 0.15)", color: "#22c55e", border: "#22c55e", glow: "rgba(34, 197, 94, 0.35)" },
            { bg: "rgba(249, 115, 22, 0.15)", color: "#f97316", border: "#f97316", glow: "rgba(249, 115, 22, 0.35)" },
            { bg: "rgba(236, 72, 153, 0.15)", color: "#ec4899", border: "#ec4899", glow: "rgba(236, 72, 153, 0.35)" }
        ];

        const safeGenre = genre || "Unknown";

        const index =
            safeGenre
                .split("")
                .reduce((sum, char) => sum + char.charCodeAt(0), 0) % colors.length;

        return colors[index];
    };

    const genres = (movie.genre || "")
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean);

    return (
        <div className={`movie-card ${showWatchedButton && movie.watched ? "watched-card" : ""
            }`}>
            <img src={movie.imageUrl} alt={movie.title} />
            <h3>{movie.title}</h3>

            <div className="genre-tags">
                {genres.map((genre, index) => {
                    const genreStyle = getGenreStyle(genre);
                    const isSelected = selectedGenre === genre;

                    return (
                        <button
                            key={index}
                            type="button"
                            className={`genre-tag ${isSelected ? "genre-tag-selected" : ""}`}
                            style={{
                                backgroundColor: genreStyle.bg,
                                color: genreStyle.color,
                                borderColor: genreStyle.border,
                                boxShadow: isSelected
                                    ? `0 0 14px ${genreStyle.glow}`
                                    : "none"
                            }}
                            onClick={() => onGenreClick && onGenreClick(genre)}
                        >
                            {genre}
                        </button>
                    );
                })}
            </div>

            <p>{movie.year}</p>
            <p>⭐ {movie.rating}/10</p>

            {showWatchedButton && movie.watched && (
                <p className="watched-badge">Watched ✓</p>
            )}

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