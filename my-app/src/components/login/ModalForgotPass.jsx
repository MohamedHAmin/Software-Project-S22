import React from 'react'
import "./Styles/ModalForgotPass.css"
import { Formik, Form, ErrorMessage, Field } from 'formik'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from 'yup'

/**
 * popup for forgot password 
 * @param {boolean} closeModal 
 * @returns a popup with one input field for e-mail and two buttons one to search and the other one is to close the popup
 */
const Modal = ({ closeModal }) => {
    const [error1, setError1] = useState(false);
    const [email, setemail] = useState("");

    // States for checking the errors
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const onChangeHandeler = (event) => {
        setemail(event.target.value);
    };

    //validation for input
    const validate = (email) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        if (!email) {
            errors.email = "It is a required field";
        }
        else if (!regex.test(email)) {
            errors.email = "This is not a valid email format!";
        }
        else {
            setIsSubmit(true);
        }
        return errors;
    }

    const Navigate = useNavigate();
    const onSubmit = (event) => {
        event.preventDefault();
        let data = {
            email: email
        }
        console.log(data);

        setFormErrors(validate(email));

        axios.post("http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/user/forgotpassword", data)
            .then((res) => {
                if (res.data.success && res.data.success.includes('verified')) {
                    alert(" Email hasn't been verified yet");
                }
                else if (res.data.success && res.data.success.includes('registered')) {
                    alert(" Email is not found or registered");
                } else {
                    console.log(res);
                    alert("Please check your email");
                }
                setemail("");
                Navigate("/");     // navigate to login
                window.location.reload();

            }).catch(err => {
                console.log(err.response.data.success);

                setError1("Invalid Email");

            })
    };

    return (
        <div className='modalBackground'>
            <div className='modalContainer'>
                <div className='titleCloseBtn'>
                    <button onClick={() => closeModal(false)}>X</button>
                </div>
                <div className='title'>
                    <h1>Find your Larry account</h1>
                </div>
                {/*<Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>*/}
                <form >
                    <div className='body'>
                        <div className="nada">
                            <input onChange={onChangeHandeler} value={email} name="email" placeholder="Please enter your Email" autoComplete="off" type="email" />
                        </div>
                    </div>
                    <p className="error">{formErrors.email}</p>
                    {/* <ErrorMessage name='email' component="span" className="error" />
                        {error1 === false ? <span></span> : <span className="error">{error1}</span>} */}

                    <div className='footer'>
                        <button onClick={onSubmit} type="submit">Search</button>
                    </div>
                </form>
                {/* </Formik> */}

            </div >
        </div >
    )
}
export default Modal
