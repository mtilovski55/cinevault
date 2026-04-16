import { Link } from "react-router-dom";

function Home() {
    return (
        <section className="page-container hero">
            <h1>Track Your Movies Like a Pro</h1>
            <p>
                Discover, organize, and manage your personal movie collection.
                Keep track of what you’ve watched and what’s next.
            </p>

            <div className="hero-actions">
                <Link to="/movies" className="btn">Browse Movies</Link>
                <Link to="/create" className="btn-secondary">Add Movie</Link>
            </div>
        </section>
    );
}

export default Home;