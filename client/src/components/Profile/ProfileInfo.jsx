import React from "react";
import "./Styles/ProfileInfo.css";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LinkIcon from "@mui/icons-material/Link";
import CakeIcon from "@mui/icons-material/Cake";
import { NavLink, useParams } from "react-router-dom";
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
/**
 *
 * @param {props} props Getting all the needed information for the profile.
 * @returns Returns the information of the profile.
 */
function ProfileInfo({
  name,
  userName,
  date,
  followers,
  following,
  bio,
  location,
  website,
  birthday,
  birthdayVisability,
  locationVisability,
  isPrivate,
  isFollowed,
}) {
  let { id } = useParams();
  const joinDate = new Date(date);
  const birthdate = new Date(birthday);

  const websiteLength = website.length;
  return (
    <div className="profileInfo2">
      <h2 data-testid="Edit-Profile-Name-Element">{name}</h2>
      <h6>@{userName}</h6>

      <div className="moreInfo">
        {bio ? <h5 data-testid="Edit-Profile-Bio-Element">{bio}</h5> : ""}
        {locationVisability && location ? (
          <span data-testid="Edit-Profile-Location-Element">
            <LocationOnIcon /> {location}
          </span>
        ) : (
          ""
        )}
        {website ? (
          <a href={website}>
            <span data-testid="Edit-Profile-Website-Element">
              <LinkIcon />{" "}
              {websiteLength < 26 ? website : website.substring(0, 25) + "..."}
            </span>
          </a>
        ) : (
          ""
        )}
        {birthdayVisability && birthday ? (
          <span data-testid="Edit-Profile-Birthday-Element">
            <CakeIcon /> Born in {monthNames[birthdate.getMonth()]}{" "}
            {birthdate.getDate()}
            {", "}
            {birthdate.getUTCFullYear()}
          </span>
        ) : (
          ""
        )}
        <span>
          <CalendarMonthIcon /> Joined {monthNames[joinDate.getMonth()]}{" "}
          {joinDate.getFullYear()}
        </span>
      </div>

      <div className="calenderInfo">
        <p></p>
      </div>

      
        {isPrivate?(isFollowed?(
          <div className="followInfo">
            <NavLink to={`/Profile/${id}/Following`}>
            <span>{following} Following </span>
            </NavLink>
            <NavLink to={`/Profile/${id}/Followers`}>
            <span data-testid="Followers-Profile">{followers} Followers</span>
            </NavLink>
          </div>

        ):(
          <div className="followInfo">
            <span>{following} Following </span>
            <span data-testid="Followers-Profile">{followers} Followers</span>
          </div>
        )) 
        :(
          <div className="followInfo">
              <NavLink to={`/Profile/${id}/Following`}>
              <span>{following} Following </span>
              </NavLink>
              <NavLink to={`/Profile/${id}/Followers`}>
              <span data-testid="Followers-Profile">{followers} Followers</span>
              </NavLink>
         </div>
        )}
        
      
    </div>
  );
}
export default ProfileInfo;
