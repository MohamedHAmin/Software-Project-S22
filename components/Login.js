import React from "react";
import { useState, useEffect } from "react";
import "./Login.css";

function Login() {
    const initialValues = { username: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
    };

    // useEffect(() => {
    //     console.log(formErrors);
    //     if (Object.keys(formErrors).length === 0 && isSubmit) {
    //         console.log(formValues);
    //     }
    // }, [formErrors]);

    const validate = (values) => {
        const errors = {};
        if (!values.username && !values.email) {
            errors.username = "It is a required field";
        }
        if (!values.password) {
            errors.password = "Password is required";
        } else if (values.password.length < 4) {
            errors.password = "Password must be more than 4 characters";
        } else if (values.password.length > 10) {
            errors.password = "Password cannot exceed more than 10 characters";
        }
        return errors;
    };

    return (
        <div className="container">
            <div className="title">Login Form </div>
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <p className="success">Signed in successfully</p>
            ) : (<p className='failed'>Please complete the required info!</p>)}
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <input
                        type="text"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    <label>Email or Username </label>
                </div>
                <p>{formErrors.username}</p>
                <div className="field">
                    <input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                    />
                    <label>Password</label>
                </div>
                <p>{formErrors.password}</p>
                <div className="content">
                    <div className="checkbox">
                        <input type="checkbox" id="remember-me" />
                        <label for="remember-me">Remember me</label>
                    </div>
                    <div className="pass-link">
                        <a href="#">Forgot password?</a>
                    </div>
                </div>
                <button className="button">Login</button>
                <div class="signup-link">
                    Not a member? <a href="/signup">Signup now</a>
                </div>
            </form>
        </div>
    );
}
export default Login;
