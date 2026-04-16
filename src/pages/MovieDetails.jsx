import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOneMovie } from "../services/movieService";

function MovieDetails() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        getOneMovie(id)
            .then((result) => setMovie(result))
            .catch((error) => console.log(error));
    }, [id]);

    if (!movie) {
        return (
            <section className="page-container">
                <h1 className="section-title">Loading...</h1>
            </section>
        );
    }

    return (
        <section className="page-container">
            <div
                className="details-layout"
                style={{
                    backgroundImage: `url(${movie.imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <img src={movie.imageUrl} alt={movie.title} />

                <div className="details-content">
                    <p className="details-tag">{movie.genre}</p>
                    <h1>{movie.title}</h1>

                    <div className="details-meta">
                        <span className="details-pill">{movie.year}</span>
                        <span className="details-pill">⭐ {movie.rating}/10</span>
                    </div>

                    <p className="details-description">{movie.description}</p>

                    <div className="details-actions">
                        <Link to="/movies" className="btn-secondary">
                            Back to Catalog
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default MovieDetails;