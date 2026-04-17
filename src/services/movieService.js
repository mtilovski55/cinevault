const API_URL = "https://cinevault-x99x.onrender.com";

export async function getWatchlist() {
    const storedUser = localStorage.getItem("user");
    const user =
        storedUser && storedUser !== "undefined"
            ? JSON.parse(storedUser)
            : null;

    if (!user) {
        throw new Error("No logged in user");
    }

    const response = await fetch(`${API_URL}/watchlist?userId=${user.id}`);

    if (!response.ok) {
        throw new Error("Failed to fetch watchlist");
    }

    return response.json();
}

export async function addToWatchlist(movie) {
    const storedUser = localStorage.getItem("user");
    const user =
        storedUser && storedUser !== "undefined"
            ? JSON.parse(storedUser)
            : null;

    if (!user) {
        throw new Error("No logged in user");
    }

    const existingResponse = await fetch(
        `${API_URL}/watchlist?userId=${user.id}&movieId=${movie.id}`
    );
    const existingItems = await existingResponse.json();

    if (existingItems.length > 0) {
        return existingItems[0];
    }

    const response = await fetch(`${API_URL}/watchlist`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: user.id,
            movieId: movie.id,
            movie,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to add to watchlist");
    }

    return response.json();
}

export async function removeFromWatchlist(movieId) {
    const storedUser = localStorage.getItem("user");
    const user =
        storedUser && storedUser !== "undefined"
            ? JSON.parse(storedUser)
            : null;

    if (!user) {
        throw new Error("No logged in user");
    }

    const existingResponse = await fetch(
        `${API_URL}/watchlist?userId=${user.id}&movieId=${movieId}`
    );
    const existingItems = await existingResponse.json();

    if (existingItems.length === 0) {
        return;
    }

    const watchlistItemId = existingItems[0].id;

    const response = await fetch(`${API_URL}/watchlist/${watchlistItemId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to remove from watchlist");
    }
}