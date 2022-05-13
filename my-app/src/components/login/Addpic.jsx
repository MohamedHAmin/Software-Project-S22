import React from 'react'
import "./Styles/Addpic.css"
import { Formik, Form, ErrorMessage, Field } from 'formik'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from 'yup'
import ImageUploaderBanner from "../Profile/ImageUploaderBanner";
import ImageUploaderProfile from "../Profile/ImageUploaderProfile";

const Modal = ({ closeModal }, props) => {

    return (
        <div className='modalBackground'>
            <div className='Container'>
                <div className='titleCloseBtn'>
                    <button onClick={() => closeModal(false)}>X</button>
                </div>
                <div className='title'>
                    <h1>Pick a profile picture</h1>
                    <h6>Have a favorite selfie? Upload it now.</h6>
                </div>
                <div className="photo">
                    <ImageUploaderBanner Name={props.Name} photo={props.coverPhoto} />
                    <ImageUploaderProfile classname="avatar" Name={props.Name} photo={props.profilePhoto} />
                </div>
                <div className='footer'>
                    <button onClick={() => closeModal(false)} type="submit">Skip for now</button>
                </div>

            </div >
        </div >
    )
}
export default Modal