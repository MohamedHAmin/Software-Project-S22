import React from "react";
import './Styles/ProfileName.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function ProfileName(props) {
  return(
    <div className="profileName">
    <ArrowBackIcon/>
    <div className="description" >
    <h2>{props.pName}</h2>
    <p>{props.tweetNum} Tweets</p>
    </div>
    </div>
  )
}
export default ProfileName