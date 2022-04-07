import React from "react";
import "./Styles/ProfileName.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
function ProfileName({ pName, tweetNum }) {
  const navigate = useNavigate();
  return (
    <div className="profileName">
      <ArrowBackIcon onClick={() => navigate(-1)} />
      <div className="description">
        <h2>{pName}</h2>
        <p>{tweetNum} Tweets</p>
      </div>
    </div>
  );
}
export default ProfileName;
