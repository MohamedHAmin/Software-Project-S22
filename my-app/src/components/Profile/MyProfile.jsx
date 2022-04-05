import React, {useState} from "react";
import popUp from "./popUp"
import './Styles/MyProfile.css'
import ProfileName from "./ProfileName";
import Avatar from '@mui/material/Avatar';
import ProfileInfo from "./ProfileInfo";
import {Button} from '@mui/material'
function MyProfile({name,tweets,userName,date,followers,following}) {
  const [butonPopup,setButtonPopup] = useState(false);
  return (
    <div className="myProfile">
    <ProfileName pName={name} tweetNum={tweets} />
    <div className="profileSetup">
    <Avatar className="profileImage" alt="Ahmed Emad" src="https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y" />
    <Button className="setupProfileButton" onClick={() => setButtonPopup(true)} variant="outlined" fullWidth>Set Up Profile
    </Button>
    </div>
    <ProfileInfo name={name} userName={userName} date={date} followers={followers} following={following}/>
    </div>
  );
}

export default MyProfile;