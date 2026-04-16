import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllMovies } from "../services/movieService";

function Home() {
    const [featuredMovies, setFeaturedMovies] = useState([]);

    useEffect(() => {
        getAllMovies()
            .then((result) => setFeaturedMovies(result.slice(0, 3)))
            .catch((error) => console.log(error));
    }, []);

    return (
        <section className="page-container">
            <div className="hero">
                <h1>Track Your Movies Like a Pro</h1>
                <p>
                    Discover, organize, and manage your personal movie collection.
                    Save titles to your watchlist and keep track of what you’ve watched.
                </p>

                <div className="hero-actions">
                    <Link to="/movies" className="btn">Browse Movies</Link>
                    <Link to="/watchlist" className="btn-secondary">My Watchlist</Link>
                </div>
            </div>

            <div className="home-features">
                <div className="feature-card">
                    <h3>Browse Movies</h3>
                    <p>Explore your growing movie catalog by genre and details.</p>
                </div>

                <div className="feature-card">
                    <h3>Build a Watchlist</h3>
                    <p>Save the movies you want to watch later in one clean place.</p>
                </div>

                <div className="feature-card">
                    <h3>Track Progress</h3>
                    <p>Mark movies as watched and manage your personal collection.</p>
                </div>
            </div>

            <div className="home-section">
                <h2>Featured Movies</h2>
                <p>Some picks from your current catalog.</p>

                <div className="movie-list">
                    {featuredMovies.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <img src={movie.imageUrl} alt={movie.title} />
                            <h3>{movie.title}</h3>
                            <p>{movie.genre}</p>
                            <p>{movie.year}</p>
                            <Link to={`/movies/${movie.id}`}>Details</Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Home;