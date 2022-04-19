import React, { useState ,useEffect } from "react";
import Reacts from "./Reacts";
import moment from 'moment';
import Comment from "./Comment";
import Avatar from '@mui/material/Avatar';
import Logo from "../../Images/Logo Title Page.png"
import Delete from '@mui/icons-material/DeleteOutlined';
import "./Styles/Post.css";

function Post(props) {
  const [isAdmin]=useState(true);
  const [text,setText] =useState("");
    useEffect(()=>{
    setText(props.post)
    },[props.post])
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
        <div className="tweetContent">{text}</div>
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
export default Post;
