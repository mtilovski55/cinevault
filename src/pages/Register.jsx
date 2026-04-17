import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";

function Register() {
    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");
    const [shakeTrigger, setShakeTrigger] = useState(0);

    const changeHandler = (e) => {
        setValues((state) => ({
            ...state,
            [e.target.name]: e.target.value
        }));

        setErrors((state) => ({
            ...state,
            [e.target.name]: ""
        }));

        setServerError("");
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!values.email) newErrors.email = "Email is required";
        if (!values.password) newErrors.password = "Password is required";
        if (!values.confirmPassword) newErrors.confirmPassword = "Confirm your password";

        if (values.password !== values.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setShakeTrigger((prev) => prev + 1);
            return;
        }

        try {
            await registerUser({
                email: values.email,
                password: values.password,
            });
            navigate("/movies");
        } catch (error) {
            setServerError(error.message);
            setShakeTrigger((prev) => prev + 1);
        }
    };

    const getInputClass = (field) => {
        return `${errors[field] ? "input-error shake" : ""}`;
    };

    return (
        <section className="form-wrapper">
            <div className="form-card">
                <h1>Register</h1>
                <p>Create your CineVault account.</p>

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
                            className={getInputClass("email")}
                        />
                        {errors.email && (
                            <div className="field-error">
                                <span className="field-error-icon">!</span>
                                <span>{errors.email}</span>
                            </div>
                        )}
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
                            className={getInputClass("password")}
                        />
                        {errors.password && (
                            <div className="field-error">
                                <span className="field-error-icon">!</span>
                                <span>{errors.password}</span>
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            key={`confirm-${shakeTrigger}`}
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm password"
                            value={values.confirmPassword}
                            onChange={changeHandler}
                            className={getInputClass("confirmPassword")}
                        />
                        {errors.confirmPassword && (
                            <div className="field-error">
                                <span className="field-error-icon">!</span>
                                <span>{errors.confirmPassword}</span>
                            </div>
                        )}
                    </div>

                    {serverError && (
                        <div className="field-error">
                            <span className="field-error-icon">!</span>
                            <span>{serverError}</span>
                        </div>
                    )}

                    <button className="btn">Register</button>
                </form>

                <p className="form-switch">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </section>
    );
}

export default Register;