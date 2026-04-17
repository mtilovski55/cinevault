import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");
    const [shakeTrigger, setShakeTrigger] = useState(0);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }));

        setErrorMessage("");
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!values.email || !values.password) {
            setErrorMessage("All fields are required");
            setShakeTrigger((prev) => prev + 1);
            return;
        }

        try {
            await loginUser(
                values.email.trim().toLowerCase(),
                values.password.trim()
            );
            navigate("/movies");
        } catch (error) {
            localStorage.removeItem("user");
            setErrorMessage(error.message || "Invalid email or password");
            setShakeTrigger((prev) => prev + 1);
        }
    };

    const inputClass = errorMessage ? "input-error shake" : "";

    return (
        <section className="form-wrapper">
            <div className="form-card">
                <h1>Welcome Back</h1>
                <p>Log in and continue your movie journey.</p>

                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            key={`email-${shakeTrigger}`}
                            type="email"
                            name="email"
                            placeholder="Enter email"
                            value={values.email}
                            onChange={changeHandler}
                            className={inputClass}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            key={`password-${shakeTrigger}`}
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={values.password}
                            onChange={changeHandler}
                            className={inputClass}
                        />
                    </div>

                    {errorMessage && (
                        <div className="field-error">
                            <span className="field-error-icon">!</span>
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    <button className="btn">Login</button>
                </form>

                <p className="form-switch">
                    Don’t have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </section>
    );
}

export default Login;