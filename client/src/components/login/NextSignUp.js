import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Styles/NextSignUp.module.css";
import emailjs, { send } from "emailjs-com";
import './Styles/Modal.css'
import { TextField } from "@mui/material";

function NextSignUp() {

    // State for registration
    const initialValues = { birthdate: "", phoneNumber: "", bio: "" };
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
    const Navigate1 = useNavigate();
    const HandleSubmit = (e) => {
        e.preventDefault();   // prevent el refresh
        // setFormErrors(validate(formValues));    // btreturn el errors

        //Email Verification (sending email)
        emailjs.sendForm('service_81snu6l', 'template_3vnfzxg', e.target, 'x3dQSIfufrsLHpVNo')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        alert("We sent you a verification email, Please check your email")

        Navigate1("/Verification");
        

        setFormValues("", "", "", "", "")
    };

    //validation for input
    const validate = (values) => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!regex.test(values.email)) {
            errors.email = "This is not a valid email format!";
        }
        else {
            setIsSubmit(true);
        }
        return errors;
    };

    return (
        <div className={classes.container1}>
            <div className={classes.imageContainer1}>
                <img src="https://cdn.discordapp.com/attachments/949620839647698964/954738917968609290/d5acdefc-2d8c-41a4-b067-706cf76ee3aa.jpg"></img>
            </div>

            <div className={classes.signupContainer1}>
                <div className={classes.title1}>Optional Info</div>


                <form onSubmit={HandleSubmit}>

                    <div className={classes.field1}>
                        <input
                            type="date"
                            name="Birthdate"
                            value={formValues.birthdate}
                            onChange={handleChange}
                        />
                        {/* <label>Birthdate </label> */}
                    </div>
                    <div className={classes.field1}>
                        <input
                            placeholder="Phone number"
                            maxLength={11}
                            name="phoneNumber"
                            value={formValues.phoneNumber}
                            onChange={handleChange}
                        />
                        {/* <label>Phone Number </label> */}
                    </div>
                    <p className={classes.paragraph}>{formErrors.phoneNumber}</p>

                    <div className={classes.field1}>
                        <input
                            placeholder="Biography"
                            type="text"
                            name="Biography"
                            value={formValues.bio}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <button className={classes.btnsup1} >Signup</button>
                    </div>

                </form>
            </div>

        </div>
    );
}
export default NextSignUp;
