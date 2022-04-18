import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './Login.module.css'
import { GoogleLogin, GoogleLogout } from 'react-google-login'

function SignupwithGoogle() {
    const clientId = "290558265526-8ge3mt9r3u6o1ov90fj4otq0vvvo0a7g.apps.googleusercontent.com";
    const [showloginButton, setShowloginButton] = useState(true);
    const [showlogoutButton, setShowlogoutButton] = useState(false);

    //const Navigate2 = useNavigate();
    const onLoginSuccess = (res) => {
        console.log('Login Success:', res.profileObj);
        //Navigate2("/home");
        setShowloginButton(false);
        setShowlogoutButton(true);
    };

    const onLoginFailure = (res) => {
        console.log('Login Failed:', res);
    };

    const onSignoutSuccess = () => {
        alert("You have been logged out successfully");
        console.clear();
        setShowloginButton(true);
        setShowlogoutButton(false);
    };
    return (
        <div>
            {showloginButton ?
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign Up with Google"
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : null
            }

            {showlogoutButton ?
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Sign Out"
                    onLogoutSuccess={onSignoutSuccess}
                >
                </GoogleLogout> : null
            }
        </div>
    )
}
export default SignupwithGoogle;