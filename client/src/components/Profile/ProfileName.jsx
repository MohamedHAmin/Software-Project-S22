import React from "react";
import "./Styles/ProfileName.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
function ProfileName({ pName, pID }) {
  const navigate = useNavigate();
  return (
    <div className="profileName">
      <ArrowBackIcon onClick={() => navigate(-1)} />
      <div className="description">
        <h2>{pName}</h2>
        <p> @{pID} </p>
      </div>
    </div>
  );
}
export default ProfileName;
