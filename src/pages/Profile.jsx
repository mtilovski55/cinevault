import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMovies, getWatchlist } from "../services/movieService";

function Profile() {
    const navigate = useNavigate();
    const storedUser = localStorage.getItem("user");
    const user =
        storedUser && storedUser !== "undefined"
            ? JSON.parse(storedUser)
            : null;

    const [movieCount, setMovieCount] = useState(0);
    const [watchlistCount, setWatchlistCount] = useState(0);
    const [watchedCount, setWatchedCount] = useState(0);

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        getAllMovies()
            .then((movies) => setMovieCount(movies.length))
            .catch((error) => console.log(error));

        getWatchlist()
            .then((items) => {
                const userItems = items.filter(
                    (item) => String(item.userId) === String(user.id)
                );

                setWatchlistCount(userItems.length);
                setWatchedCount(userItems.filter((item) => item.watched).length);
            })
            .catch((error) => console.log(error));
    }, [user, navigate]);

    if (!user) {
        return null;
    }

    return (
        <section className="page-container">
            <div className="profile-card">
                <h1 className="section-title">My Profile</h1>
                <p className="section-subtitle">
                    A quick overview of your CineVault activity.
                </p>

                <div className="profile-info">
                    <div className="profile-email-box">
                        <span className="profile-label">Signed in as</span>
                        <p className="profile-email">{user.email}</p>
                    </div>
                </div>

                <div className="profile-stats">
                    <div className="profile-stat-card">
                        <h3>Total Movies</h3>
                        <p>{movieCount}</p>
                    </div>

                    <div className="profile-stat-card">
                        <h3>Watchlist</h3>
                        <p>{watchlistCount}</p>
                    </div>

                    <div className="profile-stat-card">
                        <h3>Watched</h3>
                        <p>{watchedCount}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;