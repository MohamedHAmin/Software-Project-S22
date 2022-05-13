import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Styles/Modal.css";

export default function Modal() {

    const initialValues = { code: "" };
    const [inputValue, setInputValue] = useState(initialValues);

    // States for checking the errors
    const [isSubmit, setIsSubmit] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    //Handling code change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    // Handling submission
    const Navigate = useNavigate();
    const HandleSubmit = (e) => {
        e.preventDefault();  // prevent el refresh
        setFormErrors(validate(inputValue));  // btreturn el errors

        // To navigate to login page after clicking the button
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            Navigate("/");
            window.location.reload(false);
        }
        else if (isSubmit === false) {
            Navigate("/Verification");
            
        }
    }
    //validation for input
    const validate = (values) => {
        const errors = {};
        if (!values.code) {
            errors.code = "You must enter verification code";
        }
        else {
            setIsSubmit(true);
        }
        return errors;
    };
    ////////////////////////////////////////////////////////////////////////////////////
    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
    }

    var change = (e) => {
        this.setState({
            userInputValue: e.target.value
        });
    };

    return (
        <>
            <button onClick={toggleModal} className="btn-modal"> Open </button>

            {modal && (
                <div className="modal">
                    <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content">
                        <div>
                            <button className="close-modal" onClick={toggleModal}> CLOSE </button>
                        </div>
                        <br></br>
                        <div>
                            <p className="words">We sent you a verification email</p>
                            <p className="words">  Please check your email then enter the code you recived to verify you</p>
                            <div className="field">
                                <input
                                    type="text"
                                    name="code"
                                    maxLength={4}
                                    autoFocus
                                    value={inputValue.code}
                                    onChange={handleChange}>
                                </input>
                            </div>
                            <p className="error">{formErrors.code}</p>
                            <br></br>
                            <button className="submit" onClick={HandleSubmit}>Submit</button>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}