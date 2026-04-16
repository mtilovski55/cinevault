const baseUrl = "http://localhost:3001/movies";

export async function getAllMovies() {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return data;
}

export async function getOneMovie(movieId) {
    const response = await fetch(`${baseUrl}/${movieId}`);
    const data = await response.json();
    return data;
}