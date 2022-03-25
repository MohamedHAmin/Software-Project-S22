import React, { useState } from "react";

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
    <Avatar className="profileImage" alt="Ahmed Emad" src="https://scontent.fcai19-4.fna.fbcdn.net/v/t1.6435-9/84551579_2716162291800662_5091543180898205696_n.jpg?_nc_cat=110&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeHrnZB4gKSGUwMf0rXbcf3jbdijfPnXOs1t2KN8-dc6zSzNPTvMnfxioyME6NpeGoUVWXaEN64OW5sKZg21tByM&_nc_ohc=8fKqhHu9fyIAX-wr-aF&_nc_ht=scontent.fcai19-4.fna&oh=00_AT8cG1UGDie_M14Z4VV-phl6Q1qb6PMK--0UpJ7d9Zq4MQ&oe=62656AAB" />
    <Button className="setupProfileButton" variant="outlined" fullWidth>Set Up Profile
    </Button>
    </div>
    <ProfileInfo/>
    </div>
  );
}

export default MyProfile;