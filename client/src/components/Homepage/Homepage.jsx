import React, { useState, useEffect } from "react";
import "./Styles/Homepage.css";
import SideBar from "../Profile/SideBar";
import Header from "./Header";
import Tweet from "./tweet";
import TweetBar from "./TweetBar";
import Post from "./Post";
import Searchbar from "./Search";
import comments from "./Arrays/comments";
import axios from "axios";
import moment from "moment";
import { FallingLines } from "react-loader-spinner";

function Homepage(props) {
  const [posts, setposts] = useState([]);
  const [count, setCount] = useState(0);
  const [userData, setuserdata] = useState([]);
  const [newtweets, setnewtweets] = useState([]);
  const [token,setToken]=useState(localStorage.getItem("accessToken"));
  const [text, setText] = useState("");
  console.log(token);
  const tokensetter=()=>
  {
    if(props.isAdmin)
    {
      setToken(localStorage.getItem("adminToken"));
      console.log(token);
    }
    else
    {
      setToken(localStorage.getItem("accessToken"));
      console.log(token);
    }
  }

  const tokenreset=()=>
  {
      setToken(localStorage.getItem("accessToken"));
    }
  const getposts = () => {
    tokenreset();
    axios
      .get(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com//api/timeline`,
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.error) {
          console.log(
            "There was error while attempting to retrieve tweets for timeline"
          );
        } else {
          setposts(res.data);
        }
      });
  };
  useEffect(() => {
    getposts();
    
  }, []);
  //const [numberOfRetweets,setNumberOfRetweets]=useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  //const [deletedpostId,setdeletedpostId]=useState(-1);
  function onimgSelectedChange(newimg) {
    //selectedImage.push(newimg);
    //console.log(newimg);
    //console.log(selectedImage);
    setSelectedImage(newimg);
    console.log(selectedImage);
  }
  //const [post,setPost] = useState("");
  //const [newtweet,setNewTweet]=useState(false);
  // console.log(posts);
  // const checkretweets=()=>{
  //   if(count !== posts.length)
  //   {
  //     var temp=count;
  //     temp=posts.length;
  //     setCount(temp);
  //   }
  // }

  const passdeletedTweet = (id) => {
    tokensetter();
    axios
      .delete(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com//api/tweet/${id}`,
        { headers: { Authorization: token } }
      )
      .then((res) => {
        console.log(res);
        if (res.error || !res.data === "success") {
          alert("something went wrong");
        } else {
          getposts();
          window.location.reload();
          window.location.reload();
        }
        //retweetCount();
      })
      .catch((err) => {
        //err.message; // 'Oops!'
        alert("Error occured while deleting");
        console.log(err);
      });
  };

  /*const passdeletedTweet =(id)=>
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
        }*/
  /*posts[index].numberOfRetweets.length*/
  //var temp=posts.filter((post)=> post.innerpostid===id).length;
  //setNumberOfRetweets(temp);
  /*const listOfComments=comments.filter((comment)=> comment.postid===id);
        if(listOfComments.length)
        {
          for(let i=0;i<listOfComments.length;i++)
          {
            const index2 =comments.map((comment)=> comment.id).indexOf(listOfComments[i].id);
            comments.splice(index2,1);
          }
        }
    }*/

  const postHandeler = () => {
    if (text != "" || selectedImage) {
      /*posts.push({
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
      setCount(temp);*/
      let data = {
        authorId: localStorage.getItem("userId"),
        text: text,
        gallery: [],
      };
      if (text === "") {
        data.text = "No-text";
      }
      if (selectedImage) {
        data.gallery.push({ photo: selectedImage });
      }
      let data2 = new FormData();
      data2.append("authorId", data.authorId);
      data2.append("text", data.text);
      data2.append("image", selectedImage);
      data2.append("imageCheck", "true");
      let x = localStorage.getItem("accessToken");
      console.log(data);
      console.log(data2);
      axios
        .post(
          `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com//api/tweet`,
          data2,
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          console.log(res);
          if (res.error) {
            alert("something went wrong");
          } else {
            getposts();
            window.location.reload();
            window.location.reload();
            // posts.unshift({
            //   _id:count,
            //   createdAt:moment().format(),
            //   authorId:{
            //     profileAvater:{
            //       url:userData.user.profileAvater.url
            //     },
            //     screenName: userData.user.screenName,
            //     tag:userData.user.tag},
            //     text:text,
            //     gallery:[selectedImage],
            //     likeCount:0,
            //     isLiked:false,
            //     retweetCount:0,
            //     replyCount:0
            //   })
            //   setposts(posts);
            //   var temp=count;
            //   temp++;
            //   setCount(temp);
            //   console.log(posts);
            //   console.log(count);
          }
        })
        .catch((err) => {
          //err.message; // 'Oops!'
          alert(err.response.data.error);
          console.log(err);
        });

      setText("");
      setSelectedImage();
    }
  };
  console.log(posts);
  const onChangeHandeler = (event) => {
    setText(event.target.value);
  };
  //posts=keyIndex(posts,1);
  return (
    <div className="Homepage">
      <SideBar Home isAdmin={props.isAdmin} />
      <div className="postConatiner">
        <Header />
        <Tweet
          value={text}
          onChangeHandeler={onChangeHandeler}
          ali={selectedImage}
        />
        <TweetBar
          postHandeler={postHandeler}
          onimgChange={onimgSelectedChange}
        />
        {posts.length ? (
          posts.map((post) => (
            <Post
              post={post}
              passdeletedTweet={passdeletedTweet}
              isAdmin={props.isAdmin}
              isPost={true}
              //path="Home"
              //postid={post.id}
              //username={post.username}
              //tagName={post.displayName}
              //content={post.content}
              //hour={post.posthour}
              //date={post.postdate}
              //image={post.images}
              //count={count}
              //setCount={setCount}
              //numberOfRetweets={post.numberOfRetweets}
              //setNumberOfRetweets={setNumberOfRetweets}
            />
          ))
        ) : (<></>
          // <div className="Loader">
          //   <FallingLines height={120} width={150} color="var(--color-mode)" />
          // </div>
        )}
        {/* {posts?.length ? ( 
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
          ):(<></>)} */}
        {/* <Retweet key={0}
              username={"Ahmed_Emad"}
              tagName={"AhmedEmad71"}
              content={"tweet"}/> */}
      </div>
      <div className="rightbar">
        <div className="searchbar">
          <Searchbar />
        </div>
      </div>
    </div>
  );
}
export default Homepage;
{
  /* <a href='/Home'><button>hh</button></a>
          <BrowserRouter>
          <Routes>
          <Route path="/Profile" element={<ProfilePage />} ></Route>
          </Routes>
          </BrowserRouter> */
}

{
  /* <Report /> */
}
{
  /* <BrowserRouter>
          <Routes>
          <Route path="/Report" element={<Report />} ></Route>
          </Routes>
          </BrowserRouter> */
}
/*{posts?.length ? ( 
            posts.map((post) =>
              <Post
                post={post}
                passdeletedTweet={passdeletedTweet}
                isAdmin={props.isAdmin}
                isPost={true}
                />)
          ):(<></>)}*/
