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
import LoginwithGoogle from "./LoginwithGoogle";
import Modal from "./ModalForgotPass";

/**
 *
 *
 * @returns Returns Login form and its fields [tag, password] and login button
 */
const Login = () => {
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


                const msg = getMessaging(app);
                getToken(msg, { apidKey: "AIzaSyDd8zEGYjbbwztKcfcRdL4NlTubEUYzcXk" }).then((currentToken) => {
                    if (currentToken) {
                        console.log("🚀 ~ file: App.js ~ line 12 ~ getToken ~ currentToken", currentToken)
                        axios
                            .get(
                                `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/sendfcm?token=${currentToken}`,
                                { headers: { Authorization: res.data.token.token } }
                            ).then((res) => {

                                console.log("🚀 ~ file: Login.jsx ~ line 59 ~ getToken ~ res", res)
                            }).catch(e => {
                                console.log("🚀 ~ file: Login.jsx ~ line 62 ~ ).then ~ e", e.response)

                            })
                        // Send the token to your server and update the UI if necessary
                        // ...
                    } else {
                        // Show permission request UI
                        console.log('No registration token available. Request permission to generate one.');
                        // ...
                    }
                }).catch((err) => {
                    console.log('An error occurred while retrieving token. ', err);
                    // ...
                });
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

                    <div className={classes.GoogleLogin}>
                        <LoginwithGoogle />
                    </div>

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
                                <button className={classes.button} onClick={() => { setOpenModal(true); }}>Forgot password?</button>
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