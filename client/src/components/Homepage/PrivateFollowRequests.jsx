import React, { useState ,useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Logo from "../../Images/Logo Title Page.png"
import axios from 'axios';
import {Button} from '@mui/material';
import Stack from '@mui/material/Stack';
function PrivateFollowRequests(props)
{
    function passdata()
    {
        props.passdata(props.followrequest.requestUser._id);
    }
    return(
        <div key={props.index} className="comments">
                        <img className="logo" src={Logo}/>
                        <Stack spacing={1} direction="row" alignItems="flex-start">
                            {props.followrequest.requestUser? <Avatar src={props.followrequest.requestUser.profileAvater.url}/>:(<></>)}
                            <Stack direction="column" alignItems="flex-start">
                                <Stack direction="row" spacing={1}>
                                    <div>
                                        Would you like to accept the follow request of {props.followrequest.requestUser.tag} ?
                                    </div>
                                </Stack>    
                                    <Stack direction="row" spacing={2} justifyContent="flex-end" alignItems="baseline">
                                        <Button onClick={passdata} style={{fontSize:20}} className="notificationbuttons" variant="contained">
                                            Accept
                                        </Button>
                                    </Stack>
                            </Stack>
                        </Stack>
                </div>
    );
}
export default PrivateFollowRequests;