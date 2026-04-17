import { useEffect, useState } from "react";
import { getAllMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import { Search } from "lucide-react";

function Movies() {
    const [movies, setMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("default");

    useEffect(() => {
        getAllMovies()
            .then((result) => setMovies(result))
            .catch((error) => console.log(error));
    }, []);

    const genres = [
        "All",
        ...new Set(
            movies.flatMap((movie) =>
                movie.genre.split(",").map((g) => g.trim())
            )
        )
    ];

    const filteredMovies = movies
        .filter((movie) => {
            const matchesGenre =
                selectedGenre === "All" ||
                movie.genre
                    .split(",")
                    .map((g) => g.trim())
                    .includes(selectedGenre);

            const matchesSearch = movie.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

            return matchesGenre && matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === "title-asc") {
                return a.title.localeCompare(b.title);
            }

            if (sortBy === "title-desc") {
                return b.title.localeCompare(a.title);
            }

            if (sortBy === "year-newest") {
                return b.year - a.year;
            }

            if (sortBy === "year-oldest") {
                return a.year - b.year;
            }

            if (sortBy === "rating-high") {
                return b.rating - a.rating;
            }

            if (sortBy === "rating-low") {
                return a.rating - b.rating;
            }

            return 0;
        });

    return (
        <section className="page-container">
            <h1 className="section-title">Movie Catalog</h1>
            <p className="section-subtitle">Browse your collection of movies.</p>
            <p className="results-count">
                Showing {filteredMovies.length} movie{filteredMovies.length !== 1 ? "s" : ""}
            </p>

            <div className="catalog-controls">
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

                <div className="sort-bar">
                    <label htmlFor="sort">Sort by</label>
                    <select
                        id="sort"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="default">Default</option>
                        <option value="title-asc">Title A-Z</option>
                        <option value="title-desc">Title Z-A</option>
                        <option value="year-newest">Newest Year</option>
                        <option value="year-oldest">Oldest Year</option>
                        <option value="rating-high">Highest Rating</option>
                        <option value="rating-low">Lowest Rating</option>
                    </select>
                </div>

                <div className="search-bar">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search movies by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            type="button"
                            className="clear-search-btn"
                            onClick={() => setSearchTerm("")}
                        >
                            ×
                        </button>
                    )}
                </div>
            </div>

            <div className="movie-list">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                            onGenreClick={setSelectedGenre}
                            selectedGenre={selectedGenre}
                        />
                    ))
                ) : (
                    <div className="empty-state">
                        <div className="empty-icon">🎬</div>
                        <h2>No movies found</h2>
                        <p>Try a different title, genre, or clear your search.</p>

                        <div className="empty-actions">
                            <button className="btn-secondary" onClick={() => {
                                setSearchTerm("");
                                setSelectedGenre("All");
                                setSortBy("default");
                            }}>
                                Reset Filters
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Movies;