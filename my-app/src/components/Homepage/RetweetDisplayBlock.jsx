import React from "react";
import Avatar from '@mui/material/Avatar';
import "./Styles/RetweetDisplayBlock.css";

function RetweetDisplayBlock(props) {
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
        {props.image && <img className="uploadedimage" alt="not found" src={URL.createObjectURL(props.image)}/>}
    </div>
</React.Fragment>
    );
}
export default RetweetDisplayBlock;

//className={isdeletedtweet===true? "nothingClass":"tweet"}