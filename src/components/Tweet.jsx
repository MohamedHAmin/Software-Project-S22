import React, { useState } from "react";
import Reacts from "./Reacts";
import moment from 'moment';
import Comment from "./Comment";
import Avatar from '@mui/material/Avatar';
import Logo from "../Images/Logo Title Page.png"
import Delete from '@mui/icons-material/DeleteOutlined';

import "./Styles/Tweet.css";
function Tweet (props) {
    const [comment,setComment]=[{comment:""}];
    const [isAdmin]=useState(true);
    
        return (
            <React.Fragment>
                <div className="tweet">
                    <img className="logo" src={Logo}/>
                    <div className="deleteIcon">{isAdmin==true && React.createElement(Delete)}</div>
                    <div className="userInfo">
                        <Avatar className="profilePic"/>
                        <div className="profileInfo">
                            <div className="username">Ahmed Emad</div>
                            <div className="tag">@Ahmed_Emad81</div>
                        </div>
                    </div>
                    <div className="tweetContent">{props.content}</div>
                    <div className="time">
                        <p>{moment().format('hh:mm')}&nbsp;&nbsp;</p>
                        <p>{moment().format('DD/MM/YYYY')}</p>
                    </div>
                    <div className="reactsBar">
                        <Reacts/>
                    </div>
                    <div className="comment">
                        <Comment/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
 
export default Tweet;