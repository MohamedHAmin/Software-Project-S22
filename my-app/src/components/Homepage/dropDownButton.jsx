import React ,{ useState } from "react";
import "./Styles/dropDownButton.css";
import PublicIcon from '@mui/icons-material/Public';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PeopleIcon from '@mui/icons-material/People';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SportsScoreOutlinedIcon from '@mui/icons-material/SportsScoreOutlined';
import Delete from '@mui/icons-material/DeleteOutlined';
function privacyButton(){
return(
    <div className="input-group mb-3">
        <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="true"><MoreHorizIcon /></button>
        <ul className="dropdown-menu">
        <li><a className="dropdown-item btn" href="/Report"><SportsScoreOutlinedIcon className="bo" /> Report</a></li>
        <li><a className="dropdown-item btn" href="#"><Delete className="bo" />Delete</a> </li>
          
        </ul>
  </div>
);
}
export default privacyButton
//<li><a className="dropdown-item btn" href="#"><AlternateEmailIcon />only people you mention</a></li>