import React from 'react'
import "./Styles/Addpic.css"
import { Formik, Form, ErrorMessage, Field } from 'formik'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as Yup from 'yup'
import UploaderBanner from "./utils/UploaderBanner";
import UploaderProfile from "./utils/UploaderProfile";

/**
 * 
 * @param {props} props Getting the name and photo of the banner and profile picture also.
 * @returns Returns the banner photo uploader and the profile photo uploader.
 * it also contains a button if you want to skip it for now in addition to the exit button.
 */
const Addpic = (props) => {
    return (
        <div className='modalBackground'>
            <div className='Container'>
                <div className='titleCloseBtn'>
                    <button onClick={() => props.closeModal(false)}>X</button>
                </div>
                <div className='title'>
                    <h1>Pick a profile picture</h1>
                    <h6>Have a favorite selfie? Upload it now.</h6>
                </div>
                <div className="photo">
                    <UploaderBanner Name={props.Name} photo={props.coverPhoto} addBaner={props.Abanner}/>
                    <UploaderProfile classname="avatar" Name={props.Name} photo={props.profilePhoto} addAvatar={props.Aavatar} />
                </div>
                <div className='footer'>
                    <button onClick={() => props.closeModal(false)} type="submit">Skip for now</button>
                </div>

            </div >
        </div >
    )
}
export default Addpic
