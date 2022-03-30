import React from "react";
import { useState, useEffect } from "react";
import classes from "./Signup.module.css";

function Signup() {

    // State for registration
    const initialValues = { username: "", Tag: "", email: "", password: "", date: "" };
    const [formValues, setFormValues] = useState(initialValues);

    // States for checking the errors
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);

    //Handling any input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // Handling the form submission
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

    //validation for input
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
        }
        else if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        else if (values.password.length < 6) {
            errors.password = "Password must be more than 5 characters";
        }
        else if (values.password.length > 12) {
            errors.password = "Password cannot exceed more than 12 characters";
        }
        return errors;
    };

    return (
        <div className={classes.container}>
            <div className={classes.imageContainer}>
                <img src="https://cdn.discordapp.com/attachments/949620839647698964/954738917968609290/d5acdefc-2d8c-41a4-b067-706cf76ee3aa.jpg"></img>
            </div>

            <div className={classes.signupContainer}>
                <div className={classes.title}>Signup Form </div>

                {/* Showing success message OR error message if error is true */}
                {Object.keys(formErrors).length === 0 && isSubmit ?
                    (<p className="success">Signed in successfully</p>)
                    : (<p className='failed'>Please complete the required info!</p>)}

                {/* Labels and inputs for form data */}
                <form onSubmit={handleSubmit}>
                    <div className={classes.field}>
                        <input
                            placeholder="Username"
                            type="text"
                            name="username"
                            value={formValues.username}
                            onChange={handleChange}
                        />
                        {/* <label>Username  </label> */}
                    </div>
                    <p>{formErrors.username}</p>
                    <div className={classes.field}>
                        <input
                            placeholder="Tag"
                            type="text"
                            name="Tag"
                            value={formValues.Tag}
                            onChange={handleChange}
                        />
                        {/* <label>Tag </label> */}
                    </div>
                    <p>{formErrors.Tag}</p>
                    <div className={classes.field}>
                        <input
                            placeholder="E-mail"
                            type="text"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        {/* <label>Email  </label> */}
                    </div>
                    <p>{formErrors.email}</p>
                    <div className={classes.field}>
                        <input
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                        {/* <label>Password</label> */}
                    </div>
                    <p>{formErrors.password}</p>
                    <div className={classes.field}>
                        <input
                            type="date"
                            name="Birthdate"
                            value={formValues.date}
                            onChange={handleChange}
                        />
                        {/* <label>Birthdate </label> */}
                    </div>
                    <button className={classes.button}>Signup</button>
                </form>
            </div>

        </div>
    );
}
export default Signup;