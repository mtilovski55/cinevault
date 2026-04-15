import { useEffect, useState } from "react";
import { getAllMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";

function Movies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        getAllMovies()
            .then((result) => setMovies(result))
            .catch((error) => console.log(error));
    }, []);

    return (
        <section className="movies-page">
            <h1>Movie Catalog</h1>
            <div className="movie-list">
                {movies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                ))}
            </div>
        </section>
    );
}

export default Movies;