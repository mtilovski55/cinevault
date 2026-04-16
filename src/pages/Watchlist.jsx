import { useEffect, useState } from "react";
import { getWatchlist } from "../services/movieService";
import MovieCard from "../components/MovieCard";

function Watchlist() {
    const [watchlistMovies, setWatchlistMovies] = useState([]);

    useEffect(() => {
        getWatchlist()
            .then((result) => setWatchlistMovies(result))
            .catch((error) => console.log(error));
    }, []);

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
                    <p>Your watchlist is empty.</p>
                )}
            </div>
        </section>
    );
}

export default Watchlist;