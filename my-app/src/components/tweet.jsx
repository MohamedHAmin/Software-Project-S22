import React ,{ useState } from "react";
import PublicIcon from '@mui/icons-material/Public';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';import "./Styles/tweet.css";
import PersonIcon from '@mui/icons-material/Person';
function Tweet(){
    const newLocal = <span id="1" className="textarea" role="textbox" contentEditable maxLength="10"> </span>;
  var y=document.getElementById("1").innerHTML;
  console.log({y})
return(

    <div className="TweetDiv">
        {newLocal}
    </div>
);
}
export default Tweet


