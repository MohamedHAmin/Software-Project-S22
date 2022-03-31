import React ,{ useState } from "react";
import "./Styles/dropDownButton.css";
import PublicIcon from '@mui/icons-material/Public';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PeopleIcon from '@mui/icons-material/People';
function privacyButton(){
return(
    <div className="input-group mb-3">
        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true"><PublicIcon />everyone can reply</button>
        <ul className="dropdown-menu">
        <li><a className="dropdown-item btn" href="#"><PublicIcon />everyone can reply</a></li>
        <li><a className="dropdown-item btn" href="#"><PeopleIcon />people you follow</a> </li>
        <li><a className="dropdown-item btn" href="#"><AlternateEmailIcon />only people you mention</a></li>
       
        </ul>
  </div>
);
}
export default privacyButton