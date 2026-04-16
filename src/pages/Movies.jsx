import { useEffect, useState } from "react";
import { getAllMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("All");

    useEffect(() => {
        getAllMovies()
            .then((result) => setMovies(result))
            .catch((error) => console.log(error));
    }, []);

    const genres = ["All", ...new Set(movies.map((movie) => movie.genre))];

    const filteredMovies =
        selectedGenre === "All"
            ? movies
            : movies.filter((movie) => movie.genre === selectedGenre);

    return (
        <section className="page-container">
            <h1 className="section-title">Movie Catalog</h1>
            <p className="section-subtitle">Browse your collection of movies.</p>

            <div className="filter-bar">
                <label htmlFor="genre">Filter by genre</label>
                <select
                    id="genre"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
            </div>

            <div className="movie-list">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))
                ) : (
                    <div className="empty-state">
                        <h2>No movies found</h2>
                        <p>Try selecting another genre or add a new movie to the catalog.</p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Movies;