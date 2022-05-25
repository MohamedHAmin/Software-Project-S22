import { React } from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import classes from './Styles/Login.module.css';
import app from '../../firebase';
import { getMessaging, getToken } from "firebase/messaging";

import { useNavigate } from "react-router-dom";
import Navbar from "./navbar";
import Modal from "./ModalForgotPass";

/**
 *
 *
 * @returns Returns Login form and its fields [tag, password] and a button for forgotpassword and another one for login 
 * it also contains a button to login with Google
 */
const Login = () => {
    
     const google = () => {
        window.open("http://localhost:5000/user/auth/google", "_self");
    };
    
    const [error, setError] = useState(false);
    const initialValues = {
        email_or_username: "",
        password: ""
    }
    const Navigate = useNavigate();
    const validationSchema = Yup.object().shape({
        password: Yup.string().matches(/^(\S+$)/, 'You entered a space ,please remove it').min(6).max(16).required("Enter Your Password"),
        email_or_username: Yup.string().matches(/^(\S+$)/, 'You entered a space ,please remove it').min(3).required("Enter Your Email or Tag.")
    })
    const onSubmit = (data) => {
        console.log(data);
        axios.post("http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/user/login", data).then((res) => {
            console.log(res);
            if (res.error) {
                if (res.error === "Error: unable to login as user is not verified") {
                    alert("Please verify your email")
                } else if (res.error === "Error: unable to login") {
                    setError("Wrong userName OR Password");
                }
            } else {
                localStorage.setItem("accessToken", res.data.token.token);
                localStorage.setItem("userId", res.data.user.user._id);
                if (res.data.user.adminToken) {
                    localStorage.setItem("adminToken", res.data.user.adminToken.token);
                }
                else {
                    localStorage.setItem("adminToken", "");
                }
                Navigate("/Home");
                Navigate(0);
            }
        })
        
    };
    const clickHandeler = () => {
        Navigate("/SignUp")
    }

    const [openModal, setOpenModal] = useState(false)

    return (
        <div>
            <Navbar />
            <div className={classes.container}>
                <div className={classes.imageContainer}>
                    <img src="https://cdn.discordapp.com/attachments/949620839647698964/954738917968609290/d5acdefc-2d8c-41a4-b067-706cf76ee3aa.jpg" alt="h"></img>
                </div>
                <div className={classes.loginContainer}>
                    <div className={classes.title}>Login Form </div>

                     <button className={classes.logingoogle} onClick={google}>
                        <img src="https://raw.githubusercontent.com/safak/youtube/react-social-login/client/src/img/google.png" alt="" className={classes.icon} />
                        Google
                    </button>

                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} className={classes.form}>
                        <Form>
                            <div className={classes.field}>
                                <Field className={classes.userinput} name="email_or_username" placeholder="Email or Tag" autoComplete="off" />
                            </div>
                            <ErrorMessage name='email_or_username' component="span" className={classes.error} />
                            {error === false ? <span></span> : <span className={classes.error}>{error}</span>}

                            <div className={classes.field}>
                                <Field type="password" className={classes.userinput} name="password" placeholder="password" autoComplete="off" />
                            </div>
                            <ErrorMessage name='password' component="span" className={classes.error} />
                            {error === false ? <span></span> : <span className={classes.error}>{error}</span>}

                            <button className={classes.button} type="submit" >Login</button>

                            <div className={classes.passLink}>
                                <button type="button" className={classes.button} onClick={() => { setOpenModal(true); }}>Forgot password?</button>
                                {openModal && <Modal closeModal={setOpenModal} />}
                            </div>

                            <div className={classes.signupLink}>
                                Not a member? <a onClick={clickHandeler}>Signup now</a>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div >
    );
}
export default Login;
