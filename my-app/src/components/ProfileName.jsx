import React, { useState } from "react";

import './Styles/ProfileName.css'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function ProfileName() {
  return(
    <div className="profileName">
    <ArrowBackIcon/>
    <div className="description" >
    <h2>Ahmed Emad</h2>
    <p>6 Tweets</p>
    </div>
    </div>
  )
}
export default ProfileName