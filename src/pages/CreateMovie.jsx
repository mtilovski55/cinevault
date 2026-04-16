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

    const [errors, setErrors] = useState({});
    const [shakeTrigger, setShakeTrigger] = useState(0);
    const [successMessage, setSuccessMessage] = useState("");

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

        setErrors((state) => ({
            ...state,
            [e.target.name]: ""
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formValues.title) newErrors.title = "Title is required";
        if (!formValues.genre) newErrors.genre = "Genre is required";
        if (!formValues.year) newErrors.year = "Year is required";
        if (!formValues.imageUrl) newErrors.imageUrl = "Image URL is required";
        if (!formValues.description) newErrors.description = "Description is required";
        if (!formValues.rating) newErrors.rating = "Rating is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setShakeTrigger((prev) => prev + 1);
            return;
        }

        await createMovie({
            ...formValues,
            year: Number(formValues.year),
            rating: Number(formValues.rating)
        });

        setSuccessMessage("Movie added successfully!");

        setTimeout(() => {
            navigate("/movies");
        }, 1200);
    };

    const getInputClass = (field) => {
        return `${errors[field] ? "input-error" : ""} ${errors[field] ? "shake" : ""}`;
    };

    return (
        <section className="form-wrapper">
            <div className="form-card movie-form-card">
                <h1>Add New Movie</h1>
                <p>Create a new movie entry for your CineVault catalog.</p>

                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            key={`title-${shakeTrigger}`}
                            type="text"
                            name="title"
                            placeholder="Enter movie title"
                            value={formValues.title}
                            onChange={changeHandler}
                            className={getInputClass("title")}
                        />
                        {errors.title && (
                            <div className="field-error">
                                <span className="field-error-icon">!</span>
                                <span>{errors.title}</span>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Genre</label>
                        <input
                            key={`genre-${shakeTrigger}`}
                            type="text"
                            name="genre"
                            placeholder="e.g. Action, Sci-Fi"
                            value={formValues.genre}
                            onChange={changeHandler}
                            className={getInputClass("genre")}
                        />
                        {errors.genre && (
                            <div className="field-error">
                                <span className="field-error-icon">!</span>
                                <span>{errors.genre}</span>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Year</label>
                        <input
                            key={`year-${shakeTrigger}`}
                            type="number"
                            name="year"
                            placeholder="e.g. 2024"
                            value={formValues.year}
                            onChange={changeHandler}
                            className={getInputClass("year")}
                        />
                        {errors.year && (
                            <div className="field-error">
                                <span className="field-error-icon">!</span>
                                <span>{errors.year}</span>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Image URL</label>
                        <input
                            key={`image-${shakeTrigger}`}
                            type="text"
                            name="imageUrl"
                            placeholder="Paste poster URL"
                            value={formValues.imageUrl}
                            onChange={changeHandler}
                            className={getInputClass("imageUrl")}
                        />
                        {errors.imageUrl && (
                            <div className="field-error">
                                <span className="field-error-icon">!</span>
                                <span>{errors.imageUrl}</span>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            key={`description-${shakeTrigger}`}
                            name="description"
                            placeholder="Short description"
                            value={formValues.description}
                            onChange={changeHandler}
                            className={getInputClass("description")}
                        />
                        {errors.description && (
                            <div className="field-error">
                                <span className="field-error-icon">!</span>
                                <span>{errors.description}</span>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Rating</label>
                        <input
                            key={`rating-${shakeTrigger}`}
                            type="number"
                            name="rating"
                            placeholder="1-10"
                            min="1"
                            max="10"
                            value={formValues.rating}
                            onChange={changeHandler}
                            className={getInputClass("rating")}
                        />
                        {errors.rating && (
                            <div className="field-error">
                                <span className="field-error-icon">!</span>
                                <span>{errors.rating}</span>
                            </div>
                        )}
                    </div>

                    {successMessage && (
                        <div className="success-message">
                            <span className="success-icon">✓</span>
                            <span>{successMessage}</span>
                        </div>
                    )}

                    <button className="btn">Add Movie</button>
                </form>
            </div>
        </section>
    );
}

export default CreateMovie;