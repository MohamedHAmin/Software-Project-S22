import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Signup.module.css";
import SignupwithGoogle from "./SignupwithGoogle";
import emailjs, { send } from "emailjs-com";
import './Modal.css'

function Signup() {

    // State for registration
    const initialValues = { username: "", Tag: "", email: "", password: "" };
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
    const Navigate = useNavigate();
    const HandleSubmit = (e) => {
        e.preventDefault();   // prevent el refresh
        setFormErrors(validate(formValues));    // btreturn el errors

        //Email Verification (sending email)
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            emailjs.sendForm('service_81snu6l', 'template_3vnfzxg', e.target, 'x3dQSIfufrsLHpVNo')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });

            Navigate("/NextSignup");
        }
        setFormValues("", "", "", "", "")
    };

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
        else {
            setIsSubmit(true);
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

                <div className={classes.GoogleLogin}>
                    <SignupwithGoogle />
                </div>

                <form onSubmit={HandleSubmit}>
                    <div className={classes.field}>
                        <input
                            id="UNs"
                            defaultValue={""}
                            placeholder="Username"
                            type="text"
                            name="username"
                            value={formValues.username}
                            onChange={handleChange}
                        />
                        {/* <label>Username  </label> */}
                    </div>
                    <p className={classes.paragraph}>{formErrors.username}</p>
                    <div className={classes.field}>
                        <input
                            id="Tag"
                            placeholder="Tag"
                            type="text"
                            name="Tag"
                            value={formValues.Tag}
                            onChange={handleChange}
                        />
                        {/* <label>Tag </label> */}
                    </div>
                    <p className={classes.paragraph}>{formErrors.Tag}</p>
                    <div className={classes.field}>
                        <input
                            id="EM"
                            placeholder="E-mail"
                            type="text"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        {/* <label>Email  </label> */}
                    </div>
                    <p className={classes.paragraph}>{formErrors.email}</p>
                    <div className={classes.field}>
                        <input
                            id="PWs"
                            placeholder="Password"
                            type="password"
                            name="password"
                            value={formValues.password}
                            onChange={handleChange}
                        />
                        {/* <label>Password</label> */}
                    </div>
                    <p className={classes.paragraph}>{formErrors.password}</p>

                    <div>
                        <button className={classes.btnsup} >Next </button>
                    </div>

                </form>
            </div>

        </div>
    );
}
export default Signup;



//////////////////////////////////////////////////////////////////////////////////////////////////////
// import React from 'react';
// import { Formik, Form } from 'formik';
// import { TextField } from './Textfield';
// import * as Yup from 'yup';

// function Signup() {
//     const validate = Yup.object({
//         firstName: Yup.string()
//             .max(15, 'Must be 15 characters or less')
//             .required('Required'),
//         lastName: Yup.string()
//             .max(20, 'Must be 20 characters or less')
//             .required('Required'),
//         email: Yup.string()
//             .email('Email is invalid')
//             .required('Email is required'),
//         password: Yup.string()
//             .min(6, 'Password must be at least 6 charaters')
//             .required('Password is required'),
//         confirmPassword: Yup.string()
//             .oneOf([Yup.ref('password'), null], 'Password must match')
//             .required('Confirm password is required'),
//     })
//     // function sendEmail(e) {
//     //     emailjs.sendForm('service_81snu6l', 'template_3vnfzxg', e.target, 'x3dQSIfufrsLHpVNo')
//     //         .then((result) => {
//     //             console.log(result.text);
//     //         }, (error) => {
//     //             console.log(error.text);
//     //         });
//     //     alert("We sent you a verification email, Please check your email")
//     // }

//     return (
//         <Formik
//             initialValues={{
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//                 password: '',
//                 confirmPassword: ''
//             }}
//             validationSchema={validate}
//             onSubmit={(values, { resetForm }) => {
//                 console.log('values:', values)
//                 resetForm({ values: '' })
//                 // sendEmail(values)
//             }}
//         >
//             {formik => (
//                 <div>
//                     <div className={classes.container}>
//                         <div className={classes.imageContainer}>
//                             <img src="https://cdn.discordapp.com/attachments/949620839647698964/954738917968609290/d5acdefc-2d8c-41a4-b067-706cf76ee3aa.jpg"></img>
//                         </div>

//                         <div className={classes.signupContainer}>
//                             <div className={classes.title}>Signup Form </div>

//                             <div className={classes.GoogleLogin}>
//                                 <LoginwithGoogle />
//                             </div>

//                             <Form >
//                                 <TextField className={classes.field} placeholder="First Name" name="firstName" type="text" />
//                                 <TextField className={classes.field} placeholder="last Name" name="lastName" type="text" />
//                                 <TextField className={classes.field} placeholder="Email" name="email" type="email" />
//                                 <TextField className={classes.field} placeholder="password" name="password" type="password" />
//                                 <TextField className={classes.field} placeholder="Confirm Password" name="confirmPassword" type="password" />
//                                 <button className={classes.btn} type=" submit">Register</button>
//                             </Form>
//                         </div>
//                     </div>
//                 </div>
//             )
//             }
//         </Formik >
//     )
// }
// export default Signup;