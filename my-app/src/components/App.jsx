import React, { useState } from "react";

import './Styles/App.css'
import SideBar from "./SideBar";
import MyProfile from "./MyProfile";
import Header from "./Header";
import Tweet from "./Tweet";
import TweetBar from "./TweetBar";
import Post from "./Post"

function App() {
  const [post,setPost] = useState("");
const postHandeler = () =>{
setPost(text);
}
const [text,setText] = useState("");
const onChangeHandeler = (event) =>{
setText(event.target.value);
console.log(text);
}
  return (
    <div className="App">

    <SideBar />
    {/* <MyProfile /> */}
    
    {/* <Textarea /> */}
    <div className="postConatiner">
    <Header />

    <Tweet onChangeHandeler={onChangeHandeler} />
    <TweetBar postHandeler={postHandeler} />
    <Post  post={post} />
    </div>
   
    </div>
  );
}

export default App;
