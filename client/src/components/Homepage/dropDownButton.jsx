import React ,{ useState } from "react";
import "./Styles/dropDownButton.css";
import PublicIcon from '@mui/icons-material/Public';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PeopleIcon from '@mui/icons-material/People';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import Delete from '@mui/icons-material/DeleteOutlined';
import Report from "./Report";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";
function privacyButton(props){
return(
    <div className="input-group mb-3">
        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true"><MoreHorizIcon /></button>
        <ul className="dropdown-menu">
        <li >{!props.sameuser && !props.isAdmin && <NavLink className="dropdown-item btn" to={`/Report/Lar/${props.postid}`}><SportsScoreOutlinedIcon className="bo" /> Report</NavLink>}</li>
        <li >{(props.sameuser || props.isAdmin) && <NavLink className="dropdown-item btn" to={window.location.pathname} onClick={props.onDeleteHandler}><Delete className="bo" />Delete</NavLink>} </li>
          
        </ul>
        
  </div>
);
}
export default privacyButton
//<li><a className="dropdown-item btn" href="#"><AlternateEmailIcon />only people you mention</a></li>