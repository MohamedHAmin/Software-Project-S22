import React from "react";

import './Styles/ProfileInfo.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
function ProfileInfo()
{
  return (
    <div className="profileInfo">
      <h2>Ahmed Emad</h2>
      <h6>@Ahmed_Emad81</h6>
      <div className="calenderInfo">
      <CalendarMonthIcon />
      <p>Joined October 2020</p>
      </div>
    <div className="followInfo">
      <p>13 Following </p>
      <p>10 Followers</p>
    </div>
    </div>
  )
}
export default ProfileInfo