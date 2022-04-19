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
import moment from 'moment';
import comments from './Arrays/comments';

function Homepage(){
  const [numberOfRetweets,setNumberOfRetweets]=useState(0);
    const [selectedImage, setSelectedImage] = useState(null);
    const [deletedpostId,setdeletedpostId]=useState(-1);
    function onimgSelectedChange(newimg) {  setSelectedImage(newimg);}
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

    
    const passdeletedTweet =(id)=>
    {
        const index= posts.map((post) => post.id).indexOf(id);
        //const innerindex = posts[index];
        const innerid=posts[index].innerpostid;
        posts.splice(index,1);
        if(innerid!==undefined)
        {
          var innertweetindex=posts.map((post)=>post.id).indexOf(innerid);
          posts[innertweetindex].numberOfRetweets=(posts[innertweetindex].numberOfRetweets)-1;
          //setNumberOfRetweets(posts[innertweetindex].numberOfRetweets);
          //setCount(count-1);
          console.log(posts[innertweetindex].numberOfRetweets);
        }
/*posts[index].numberOfRetweets.length*/
        //var temp=posts.filter((post)=> post.innerpostid===id).length;
        //setNumberOfRetweets(temp);
        const listOfComments=comments.filter((comment)=> comment.postid===id);
        if(listOfComments.length)
        {
          for(let i=0;i<listOfComments.length;i++)
          {
            const index2 =comments.map((comment)=> comment.id).indexOf(listOfComments[i].id);
            comments.splice(index2,1);
          }
        }
    }

    const postHandeler = () =>{
    if(text!="" || selectedImage!=null)
    {
      posts.push({
        id:count,
        username:"Ahmed_Emad",
        displayName:"AhmedEmad71",
        content:text,
        posthour:moment().format('hh:mm'),
        postdate:moment().format('DD/MM/YYYY'),
        images:selectedImage,
        numberOfRetweets:0
      });
      var temp=count;
      temp++;
      setCount(temp);
      setText("");
      setSelectedImage(null);
    }
    }
    const [text,setText] = useState("");
    const onChangeHandeler = (event) =>{
    setText(event.target.value);
    }
    //posts=keyIndex(posts,1);
  return (
    <div className="Homepage" onClick={checkretweets}>
      <SideBar Home/>
      <div className="postConatiner">
          <Header />
          <Tweet value={text} onChangeHandeler={onChangeHandeler} ali={selectedImage} />
          <TweetBar postHandeler={postHandeler} onimgChange={onimgSelectedChange} />
          {posts?.length ? ( 
          posts.filter((post)=> post.innerpostid===undefined).map((post) =>
            <Post
              key={post.id}
              postid={post.id}
              username={post.username}
              tagName={post.displayName}
              content={post.content}
              hour={post.posthour}
              date={post.postdate}
              image={post.images}
              passdeletedTweet={passdeletedTweet}
              isPost={true}
              count={count}
              setCount={setCount}
              numberOfRetweets={post.numberOfRetweets}
              setNumberOfRetweets={setNumberOfRetweets}
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
              hour={post.posthour}
              date={post.postdate}
              innerid={post.innerpostid}
              innerusername={posts[post.innerpostid].username}
              innerdisplayName={posts[post.innerpostid].displayName}
              innercontent={posts[post.innerpostid].content}
              passdeletedTweet={passdeletedTweet}
              isPost={true}
              count={count}
              setCount={setCount}
              numberOfRetweets={post.numberOfRetweets}
              setNumberOfRetweets={setNumberOfRetweets}
              innerpostimage={post.innerpostimage}
              image={post.images}
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