import React from "react";
import { useState, useEffect } from "react";
import "./Signup.css";

function Signup() {
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
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!values.username) {
            errors.username = "Username is required!";
        }
        if (!values.Tag) {
            errors.Tag = "Tag is required!";
        }
        if (!values.email) {
            errors.email = "Email is required!";
        } else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
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
            <div className="title">Signup Form </div>
            {Object.keys(formErrors).length === 0 && isSubmit ? (
                <p className="success">Signed in successfully</p>
            ) : (<p className='failed'>Please complete the required info!</p>)}
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <input
                        type="text"
                        name="username"
                        value={formValues.username}
                        onChange={handleChange}
                    />
                    <label>Username  </label>
                </div>
                <p>{formErrors.username}</p>
                <div className="field">
                    <input
                        type="text"
                        name="Tag"
                        value={formValues.Tag}
                        onChange={handleChange}
                    />
                    <label>Tag </label>
                </div>
                <p>{formErrors.Tag}</p>
                <div className="field">
                    <input
                        type="text"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    <label>Email  </label>
                </div>
                <p>{formErrors.email}</p>
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
                <div className="field">
                    <input
                        type="date"
                        name="Birthdate"
                        value={formValues.date}
                        onChange={handleChange}
                    />
                    <label>Birthdate </label>
                </div>
                <button className="button">Signup</button>
            </form>
        </div>
    );
}
export default Signup;
