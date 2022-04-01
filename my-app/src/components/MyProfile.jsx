import React from "react";

import './Styles/MyProfile.css'
import ProfileName from "./ProfileName";
import Avatar from '@mui/material/Avatar';
import ProfileInfo from "./ProfileInfo";
import {Button} from '@mui/material'
function MyProfile() {
  return (
    <div className="myProfile">
    <ProfileName/>
    <div className="profileSetup">
    <Avatar className="profileImage" alt="Ahmed Emad" src="https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y" />
    <Button className="setupProfileButton" variant="outlined" fullWidth>Set Up Profile
    </Button>
    </div>
    <ProfileInfo/>
    </div>
  );
}

export default MyProfile;