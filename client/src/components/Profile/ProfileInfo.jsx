import React from "react";
import "./Styles/ProfileInfo.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import CakeIcon from "@mui/icons-material/Cake";
function ProfileInfo({
  name,
  userName,
  date,
  followers,
  following,
  bio,
  location,
 // website,
  birthday,
}) {
  //const websiteLength = website.length;
  return (
    <div className="profileInfo2">
      <h2 data-testid="Edit-Profile-Name-Element">{name}</h2>
      <h6>@{userName}</h6>

      <div className="moreInfo">
        {bio ? <h5 data-testid="Edit-Profile-Bio-Element">{bio}</h5> : ""}
        {location ? (
          <span data-testid="Edit-Profile-Location-Element">
            <LocationOnIcon /> {location}
          </span>
        ) : (
          ""
        )}
        {/* {website ? (
          <a href={website}>
            <span data-testid="Edit-Profile-Website-Element">
              <LinkIcon />{" "}
              {websiteLength < 26 ? website : website.substring(0, 25) + "..."}
            </span>
          </a>
        ) : (
          ""
        )} */}
        {birthday ? (
          <span data-testid="Edit-Profile-Birthday-Element">
            <CakeIcon /> Born in {birthday}
          </span>
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
        <span data-testid="Followers-Profile">{followers} Followers</span>
      </div>
    </div>
  );
}
export default ProfileInfo;
