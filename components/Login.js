import React from "react";
import { useState, useEffect } from "react";
import classes from './Login.module.css'

function Login() {

    // State for registration
    const initialValues = { username: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);

    // States for checking the errors
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    //Handling the name or password change
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
        if (!values.username && !values.email) {
            errors.username = "It is a required field";
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

            <div className={classes.loginContainer}>
                <div className={classes.title}>Login Form </div>

                {/* Showing success message OR error message if error is true */}
                {Object.keys(formErrors).length === 0 && isSubmit ?
                    (<p className="success">Signed in successfully</p>)
                    : (<p className='failed'>Please complete the required info!</p>)}

                {/* Labels and inputs for form data */}
                <form onSubmit={handleSubmit}>
                    <div className={classes.field}>
                        <input
                            placeholder="Username or E-mail"
                            type="text"
                            name="username"
                            value={formValues.username}
                            onChange={handleChange}
                        />
                        {/* <label> Email or Username </label> */}
                    </div>
                    <p>{formErrors.username}</p>
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

                    <div className={classes.content}>
                        <div className={classes.checkbox}>
                            <input type="checkbox" id="remember-me" />
                            <label for="remember-me">Remember me</label>
                        </div>
                        <div className={classes.passLink}>
                            <a href="#">Forgot password?</a>
                        </div>
                    </div>

                    <button className={classes.button}>Login</button>
                    <div className={classes.signupLink}>
                        Not a member? <a href="/signup">Signup now</a>
                    </div>
                </form>
            </div>

        </div>
    );
}
export default Login;
