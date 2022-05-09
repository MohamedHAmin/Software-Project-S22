import React from "react";
import Avatar from '@mui/material/Avatar';
import "./Styles/RetweetDisplayBlock.css";
import { NavLink } from "react-router-dom";
function RetweetDisplayBlock(props) {
  return (
    <React.Fragment>
 
    <div className="comments" >
        {/* <button onClick={deletepost}>karimm</button> */}
        {/* <img className="logo" src={Logo}/> */}
        {/* <div className="deleteIcon">{isAdmin==true && React.createElement(Delete)}</div> */}
        <div className="userInfo">
            <Avatar className="profilePic" src={props.avatar}/>
            <div className="profileInfo">
            <div className="username"><NavLink className="username" to={`/Profile/${props.authorId}`} >{props.username}</NavLink></div>
                <div className="tag"><NavLink className="tag" to={`/Profile/${props.authorId}`} >{"@" + props.tagName}</NavLink></div>
            </div>
        </div>
        <div className="tweetContent">{props.content}</div>
        {props.image? (<img className="uploadedimage" alt="not found" key={props.image._id} src={props.image.photo}/>):<></>}
    </div>
</React.Fragment>
    );
}
export default RetweetDisplayBlock;

//className={isdeletedtweet===true? "nothingClass":"tweet"}