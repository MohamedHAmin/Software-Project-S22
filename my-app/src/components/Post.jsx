import React, { useState ,useEffect } from "react";
import "./Styles/Post.css";

function Post(props) {
  const [text,setText] =useState("");
useEffect(()=>{
  setText(props.post)
},[props.post])
 const dare =new Date();
 const y=dare.getHours()
  return (
  <div className="Total-post-div">
    <div className="dede">
      <img src="\favicon1.ico"></img>
      <p className="user-name">Mazen Osama</p>
      <p className="account-name">@lnbothsides</p>
      <p>{y}</p>
    </div>
    <span className="post">
      {
        text
      }
    </span>

    </div>
    );
}

export default Post;
