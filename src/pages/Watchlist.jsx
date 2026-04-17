import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getWatchlist } from "../services/movieService";
import MovieCard from "../components/MovieCard";

function Watchlist() {
    const [watchlistMovies, setWatchlistMovies] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
            navigate("/login");
            return;
        }

        getWatchlist()
            .then((result) => {
                const userMovies = result.filter(
                    (movie) => String(movie.userId) === String(user.id)
                );
                setWatchlistMovies(userMovies);
            })
            .catch((error) => console.log(error));
    }, [navigate]);

    const removeMovieHandler = (movieId) => {
        setWatchlistMovies((state) =>
            state.filter((movie) => movie.id !== movieId)
        );
    };

    const watchedToggleHandler = (updatedMovie) => {
        setWatchlistMovies((state) =>
            state.map((movie) =>
                movie.id === updatedMovie.id ? updatedMovie : movie
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
                    watchlistMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
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