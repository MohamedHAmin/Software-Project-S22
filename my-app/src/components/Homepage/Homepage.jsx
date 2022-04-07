import React, { useState } from "react";
import './Styles/Homepage.css';
import SideBar from "../Profile/SideBar";
import Header from "./Header";
import Tweet from "./tweet";
import TweetBar from "./TweetBar";
import Post from "./Post"
import Searchbar from "./Search"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProfilePage from "../Profile/ProfilePage";
import Report from "./Report";
function Homepage(){
    const [post,setPost] = useState("");
    const [newtweet,setNewTweet]=useState(false);
    const postHandeler = () =>{
    setPost(text);
    if(text!="")
    {
      setNewTweet(true);
    }
    }
    const [text,setText] = useState("");
    const onChangeHandeler = (event) =>{
    setText(event.target.value);
    }
  return (
    <div className="Homepage">
      <SideBar Home/>
      <div className="postConatiner">
          <Header />
          <Tweet onChangeHandeler={onChangeHandeler} />
          <TweetBar postHandeler={postHandeler} />
          {newtweet && <Post  post={post} />}
      </div>
      
      
      <div className="rightbar">
          <div className="searchbar">
              <Searchbar/>
          </div>
      </div>
    </div>
  );
}
export default Homepage;
{/* <a href='/Home'><button>hh</button></a>
          <BrowserRouter>
          <Routes>
          <Route path="/Profile" element={<ProfilePage />} ></Route>
          </Routes>
          </BrowserRouter> */}

          {/* <Report /> */}
          {/* <BrowserRouter>
          <Routes>
          <Route path="/Report" element={<Report />} ></Route>
          </Routes>
          </BrowserRouter> */}