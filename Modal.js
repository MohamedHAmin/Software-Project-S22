import React, { useState } from "react";
import "./Modal.css";

export default function Modal() {
    var state = {
        userInputValue: ''
    };

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
                        <p>We sent you a verification email, Please check your email</p>
                        <p>please enter the code you recived to verify you</p>
                        <input type="text" maxLength={4} autoFocus></input>
                        {/* {
                            this.state.userInputValue === "1234" ?
                                (<p>Correct code, now you are verified you can Login</p>) :
                                (<p>wrong code please click on resend buttom</p>,
                                    <button>Resend verification code</button>)
                        } */}
                        <button className="close-modal" onClick={toggleModal}> CLOSE </button>
                    </div>
                </div>
            )}
        </>
    );
}