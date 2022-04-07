import React, { useState ,useEffect } from "react";
import Reacts from "./Reacts";
import moment from 'moment';
import Comment from "./Comment";
import Avatar from '@mui/material/Avatar';
import Logo from "../../Images/Logo Title Page.png"
import Delete from '@mui/icons-material/DeleteOutlined';
import "./Styles/Post.css";
import Button from "./dropDownButton"

function Post(props) {
  const [isdeletedtweet,setdeletedtweet]=useState(false);
//   deletepost(()=>{
//     setdeletedtweet(true)
//     },[])
function deletepost(){     
    setdeletedtweet(true);
}   
  const [isAdmin]=useState(true);
  const [text,setText] =useState("");
    useEffect(()=>{
    setText(props.post)
    },[props.post])
  return (
    <React.Fragment>
 
    <div className="tweet" >
        {/* <button onClick={deletepost}>karimm</button> */}
        {/* <img className="logo" src={Logo}/> */}
        {/* <div className="deleteIcon">{isAdmin==true && React.createElement(Delete)}</div> */}
        <div className="deleteIcon" ><a href='/Report'><Button /></a></div>
        <div className="userInfo">
            <Avatar className="profilePic"/>
            <div className="profileInfo">
                <div className="username"><a href='/Profile' >ahmed Emad</a></div>
                <div className="tag"><a href='/Profile' >@Ahmed_Emad81</a></div>
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

//className={isdeletedtweet===true? "nothingClass":"tweet"}