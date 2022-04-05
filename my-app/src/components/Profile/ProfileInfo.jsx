import React from "react";
import './Styles/ProfileInfo.css'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
function ProfileInfo({name,userName,date,followers,following})
{
  return (
    <div className="profileTopBanner">
        <h2>{name}</h2>
        <h6>@{userName}</h6>
        <div className="calenderInfo">
          <CalendarMonthIcon />
          <p>Joined {date}</p>
        </div>
        <div className="followInfo">
            <p>{following} Following </p>
            <p>{followers} Followers</p>
        </div>
    </div>
  )
}
export default ProfileInfo