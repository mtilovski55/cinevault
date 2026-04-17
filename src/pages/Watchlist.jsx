import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getWatchlist } from "../services/movieService";
import MovieCard from "../components/MovieCard";

function Watchlist() {
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const user =
            storedUser && storedUser !== "undefined"
                ? JSON.parse(storedUser)
                : null;

        if (!user) {
            navigate("/login");
            return;
        }

        getWatchlist()
            .then((result) => {
                setWatchlistMovies(result);
            })
            .catch((error) => console.log(error));
    }, [navigate]);

    const removeMovieHandler = (movieId) => {
        setWatchlistMovies((state) =>
            state.filter((item) => String(item.movieId) !== String(movieId))
        );
    };

    const watchedToggleHandler = (updatedMovie) => {
        setWatchlistMovies((state) =>
            state.map((item) =>
                String(item.movieId) === String(updatedMovie.id)
                    ? { ...item, movie: updatedMovie }
                    : item
            )
        );
    };

    return (
        <section className="page-container">
            <h1 className="section-title">My Watchlist</h1>
            <p className="section-subtitle">Movies you’ve saved to watch later.</p>
            <p className="results-count">
                {watchlistMovies.length} saved movie{watchlistMovies.length !== 1 ? "s" : ""}
            </p>

            <div className="movie-list">
                {watchlistMovies.length > 0 ? (
                    watchlistMovies.map((item) => (
                        <MovieCard
                            key={item.id}
                            movie={item.movie}
                            showWatchlistButton={false}
                            showRemoveButton={true}
                            showWatchedButton={true}
                            onRemove={removeMovieHandler}
                            onWatchedToggle={watchedToggleHandler}
                        />
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">⭐</div>
                        <h2>Your watchlist is empty</h2>
                        <p>Add movies to watch later and they’ll show up here.</p>

                        <div className="empty-actions">
                            <Link to="/movies" className="btn">
                                Browse Movies
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Watchlist;