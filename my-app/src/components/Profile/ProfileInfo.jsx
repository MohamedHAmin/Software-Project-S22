import React from "react";
import "./Styles/ProfileInfo.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
function ProfileInfo({
  name,
  userName,
  date,
  followers,
  following,
  bio,
  location,
  website,
}) {
  const websiteLength = website.length;
  return (
    <div className="profileInfo2">
      <h2>{name}</h2>
      <h6>@{userName}</h6>

      <div className="moreInfo">
        {bio ? <h5>{bio}</h5> : ""}
        {location ? (
          <span>
            <LocationOnIcon /> {location}
          </span>
        ) : (
          ""
        )}
        {website ? (
          <a href={website}>
            <span>
              <LinkIcon />{" "}
              {websiteLength < 26 ? website : website.substring(0, 25) + "..."}
            </span>
          </a>
        ) : (
          ""
        )}
        <span>
          <CalendarMonthIcon /> Joined {date}
        </span>
      </div>

      <div className="calenderInfo">
        <p></p>
      </div>

      <div className="followInfo">
        <span>{following} Following </span>
        <span>{followers} Followers</span>
      </div>
    </div>
  );
}
export default ProfileInfo;
