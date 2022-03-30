import React, { useState } from "react";
import Reacts from "./Reacts";
import Comment from "./Comment";
import Avatar from '@mui/material/Avatar';
import Logo from "../Images/Logo Title Page.png"

import "./Styles/Tweet.css";
function Tweet (props) {
    const [comment]=useState(null);
    
        return (
            <React.Fragment>
                <div className="tweet">
                    <img className="logo" src={Logo}/>
                    <Avatar className="profilePic"/>
                    <div className="profileInfo">
                        <div className="username">Ahmed Emad</div>
                        <div className="tag">@Ahmed_Emad81</div>
                    </div>
                    <div className="tweetContent">{props.content}</div>
                    <div className="time">
                        <p>7:00&nbsp;&nbsp;</p>
                        <p>10/3/2022</p>
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