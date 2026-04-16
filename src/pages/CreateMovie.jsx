import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMovie } from "../services/movieService";

function CreateMovie() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));

    const [formValues, setFormValues] = useState({
        title: "",
        genre: "",
        year: "",
        imageUrl: "",
        description: "",
        rating: ""
    });

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    const changeHandler = (e) => {
        setFormValues((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const { title, genre, year, imageUrl, description, rating } = formValues;

        if (!title || !genre || !year || !imageUrl || !description || !rating) {
            alert("All fields are required.");
            return;
        }

        const newMovie = {
            title,
            genre,
            year: Number(year),
            imageUrl,
            description,
            rating: Number(rating)
        };

        await createMovie(newMovie);
        navigate("/movies");
    };

    return (
        <section className="form-wrapper">
            <div className="form-card movie-form-card">
                <h1>Add New Movie</h1>
                <p>Create a new movie entry for your CineVault catalog.</p>

                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formValues.title}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Genre</label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            value={formValues.genre}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="year">Year</label>
                        <input
                            type="number"
                            id="year"
                            name="year"
                            value={formValues.year}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="imageUrl">Image URL</label>
                        <input
                            type="text"
                            id="imageUrl"
                            name="imageUrl"
                            value={formValues.imageUrl}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={formValues.description}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="rating">Rating</label>
                        <input
                            type="number"
                            id="rating"
                            name="rating"
                            min="1"
                            max="10"
                            value={formValues.rating}
                            onChange={changeHandler}
                        />
                    </div>

                    <button type="submit" className="btn">Add Movie</button>
                </form>
            </div>
        </section>
    );
}

export default CreateMovie;