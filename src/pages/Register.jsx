import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
        repeatPassword: ""
    });

    const changeHandler = (e) => {
        setFormValues((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        if (
            !formValues.email ||
            !formValues.password ||
            !formValues.repeatPassword
        ) {
            alert("All fields are required.");
            return;
        }

        if (formValues.password !== formValues.repeatPassword) {
            alert("Passwords do not match.");
            return;
        }

        const newUser = {
            email: formValues.email,
            password: formValues.password
        };

        await registerUser(newUser);

        navigate("/login");
    };

    return (
        <section className="form-wrapper">
            <div className="form-card">
                <h1>Create Account</h1>
                <p>Join CineVault and start building your movie world.</p>

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

                    <div className="form-group">
                        <label htmlFor="repeatPassword">Repeat Password</label>
                        <input
                            type="password"
                            id="repeatPassword"
                            name="repeatPassword"
                            value={formValues.repeatPassword}
                            onChange={changeHandler}
                        />
                    </div>

                    <button type="submit" className="btn">Register</button>
                </form>

                <p className="form-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </section>
    );
}

export default Register;