import React from "react";
import './Styles/ProfileName.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function ProfileName({pName,tweetNum}) {
  return(
    <div className="profileName">
    <ArrowBackIcon/>
    <div className="description" >
    <h2>{pName}</h2>
    <p>{tweetNum} Tweets</p>
    </div>
    </div>
  )
}
export default ProfileName