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
import posts from "./Arrays/posts"
import Retweet from './Retweet';

function Homepage(){
    //const [post,setPost] = useState("");
    //const [newtweet,setNewTweet]=useState(false);
    const [count,setCount]=useState(0);
    console.log(posts);
    const checkretweets=()=>{
      if(count !== posts.length)
      {
        var temp=count;
        temp=posts.length;
        setCount(temp);
      }
    }
    const postHandeler = () =>{
    if(text!="")
    {
      posts.push({
        id:posts.length,
        username:"Ahmed_Emad",
        displayName:"AhmedEmad71",
        content:text
      });
      var temp=count;
      temp++;
      setCount(temp);
    }
    }
    const [text,setText] = useState("");
    const onChangeHandeler = (event) =>{
    setText(event.target.value);
    }
  return (
    <div className="Homepage" onClick={checkretweets}>
      <SideBar Home/>
      <div className="postConatiner">
          <Header />
          <Tweet onChangeHandeler={onChangeHandeler} />
          <TweetBar postHandeler={postHandeler} />
          {posts?.length ? ( 
          posts.filter((post)=> post.innerpostid===undefined).map((post) =>
            <Post
              key={post.id}
              postid={post.id}
              username={post.username}
              tagName={post.displayName}
              content={post.content}
            />)
          ):(<></>)}
          {posts?.length ? ( 
          posts.filter((post)=> post.innerpostid!==undefined).map((post) =>
            <Retweet
              key={post.id}
              postid={post.id}
              username={post.username}
              tagName={post.displayName}
              content={post.content}
              innerid={post.innerpostid}
              innerusername={posts[post.innerpostid].username}
              innerdisplayName={posts[post.innerpostid].displayName}
              innercontent={posts[post.innerpostid].content}
            />)
          ):(<></>)}
          {/* <Retweet key={0}
              username={"Ahmed_Emad"}
              tagName={"AhmedEmad71"}
              content={"tweet"}/> */}
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