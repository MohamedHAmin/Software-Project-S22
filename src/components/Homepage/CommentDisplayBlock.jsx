import React from "react";
import Avatar from '@mui/material/Avatar';
import "./Styles/CommentDisplayBlock.css";

function CommentDisplayBlock(props) {
  return (
    <React.Fragment>
 
    <div className="comments" >
        {/* <button onClick={deletepost}>karimm</button> */}
        {/* <img className="logo" src={Logo}/> */}
        {/* <div className="deleteIcon">{isAdmin==true && React.createElement(Delete)}</div> */}
        <div className="userInfo">
            <Avatar className="profilePic"/>
            <div className="profileInfo">
                <div className="username"><a href='/Profile' >{props.username}</a></div>
                <div className="tag"><a href='/Profile' >{"@" + props.tagName}</a></div>
            </div>
        </div>
        <div className="tweetContent">{props.content}</div>
    </div>
</React.Fragment>
    );
}
export default CommentDisplayBlock;

//className={isdeletedtweet===true? "nothingClass":"tweet"}