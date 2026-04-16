const moviesUrl = "http://localhost:3001/movies";
const watchlistUrl = "http://localhost:3001/watchlist";

export async function getAllMovies() {
    const response = await fetch(moviesUrl);
    const data = await response.json();
    return data;
}

export async function getOneMovie(movieId) {
    const response = await fetch(`${moviesUrl}/${movieId}`);
    const data = await response.json();
    return data;
}

export async function createMovie(movieData) {
    const response = await fetch(moviesUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(movieData)
    });

    const data = await response.json();
    return data;
}

export async function getWatchlist() {
    const response = await fetch(watchlistUrl);
    const data = await response.json();
    return data;
}

export async function addToWatchlist(movie) {
    const watchlistItem = {
        movieId: movie.id,
        title: movie.title,
        genre: movie.genre,
        year: movie.year,
        imageUrl: movie.imageUrl,
        description: movie.description,
        rating: movie.rating,
        watched: false
    };

    const response = await fetch(watchlistUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(watchlistItem)
    });

    const data = await response.json();
    return data;
}

export async function removeFromWatchlist(watchlistItemId) {
    await fetch(`${watchlistUrl}/${watchlistItemId}`, {
        method: "DELETE"
    });
}

export async function markAsWatched(watchlistItem) {
    const updatedMovie = {
        ...watchlistItem,
        watched: !watchlistItem.watched
    };

    const response = await fetch(`${watchlistUrl}/${watchlistItem.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedMovie)
    });

    const data = await response.json();
    return data;
}