import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

function Login() {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    });

    const changeHandler = (e) => {
        setFormValues((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!formValues.email || !formValues.password) {
            alert("All fields are required.");
            return;
        }

        const user = await loginUser(formValues.email, formValues.password);

        if (!user) {
            alert("Invalid email or password.");
            return;
        }

        localStorage.setItem("user", JSON.stringify(user));
        navigate("/");
    };

    return (
        <section className="form-wrapper">
            <div className="form-card">
                <h1>Welcome Back</h1>
                <p>Log in and continue your movie journey.</p>

                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formValues.email}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formValues.password}
                            onChange={changeHandler}
                        />
                    </div>

                    <button type="submit" className="btn">Login</button>
                </form>

                <p className="form-switch">
                    Don’t have an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </section>
    );
}

export default Login;