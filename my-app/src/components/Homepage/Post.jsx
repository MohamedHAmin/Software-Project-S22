import React, { useState, useEffect } from "react";
import Reacts from "./Reacts";
import moment from "moment";
import Comment from "./Comment";
import Avatar from "@mui/material/Avatar";
import Logo from "../../Images/Logo Title Page.png";
import Delete from "@mui/icons-material/DeleteOutlined";
import "./Styles/Post.css";
import Button from "./dropDownButton";
import comments from "./Arrays/comments";
import RetweetDisplayBlock from "./RetweetDisplayBlock";
import LoadMore from "@mui/icons-material/MoreHoriz";
import LoadingButton from "@mui/lab/LoadingButton";
import posts from "./Arrays/posts";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Post(props) {
  //const [isdeletedtweet,setdeletedtweet]=useState(false);
  //   deletepost(()=>{
  //     setdeletedtweet(true)
  //     },[])
  const [postId] = useState(props.post._id);
  const date = new Date(props.post.createdAt);
  const [isAdmin] = useState(props.isAdmin);
  const [hasimage, sethasimage] = useState(false);
  const [canretweet, setcanretweet] = useState(true);
  //var binaryData = [];
  /*if(props.post.gallery || props.post.gallery?.length)
  {
    console.log(props.post.gallery);
      sethasimage(true);
  }*/
  //{
  //binaryData.push(props.post.gallery[0]);
  //}
  //var index=posts.map((post)=>post.id).indexOf(postId);
  /*posts[index].numberOfRetweets.length*/
  const [numberOfRetweets, setNumberOfRetweets] = useState(
    props.post.retweetCount
  );
  const [commentsperpost, setcommentsperpost] = useState(props.post.replyCount);
  const [username] = useState(props.post.authorId.screenName);
  const [tweetcontent] = useState(props.post.text);
  const [displayName] = useState(props.post.authorId.tag);
  const [sameuser, setsameuser] = useState(false);
  useEffect(() => {
    if (tweetcontent === "No-text" && !props.post.gallery[0]) {
      setcanretweet(false);
    }
  }, []);
  //const [content, setContent] = useState("");
  //const [displaylimit,setdisplaylimit] = useState(5);
  //const [displayload,setdisplayload] = useState(false);
  //const [loading, setLoading] = useState(false);
  //console.log(comments);
  /*function handleClick() {
    setLoading(true);
    if(commentsperpost > displaylimit)
    {
        var temp=displaylimit;
        temp=displaylimit+5;
        setdisplaylimit(temp);
        if(commentsperpost <= temp)
        {
          setdisplayload(false);
        }
    }
    setLoading(false);
}*/
  //const [count,setCount]=useState(props.count);
  //let tmp=comments.filter((comment) => comment.postid === postId);
  //console.log(tmp);
  //to get the content of the comments from the comment component
  /*const passData = (data) => {
    setContent(data);
    comments.push({
        id:comments.length,
        postid:postId,
        username:"Ahmed_Emad",
        displayName:"AhmedEmad71",
        content:data,
        commenthour:moment().format('hh:mm'),
        commentdate:moment().format('DD/MM/YYYY')
    });*/
  /*var temp=count;
    temp++;
    setCount(temp);*/
  /*var temp=commentsperpost;
    temp++;
    setcommentsperpost(temp);
    if (commentsperpost > displaylimit)
    {
        setdisplayload(true);
    }
  };*/
  function checkifsameuser() {
    if (props.post.authorId._id === localStorage.getItem("userId")) {
      setsameuser(true);
    }
  }

  function deletepost() {
    props.passdeletedTweet(postId);
  }
  /*else
  {
    console.log(postId);
    const index= comments.map((comment) => comment.id).indexOf(postId);
    comments.splice(index,1);
    var temp=props.commentsperpost;
    console.log(temp);
    temp--;
    props.setcommentsperpost(temp);
    console.log(temp);
  }
} */
  // const retweetCount=()=>
  //     {
  //         var temp=posts.filter((post)=> post.innerpostid===postId).length;
  //         setNumberOfRetweets(temp);
  //     }
  /*const [text,setText] =useState("");
  const [displayComments,setdisplayComments]=useState(false);
  const CommentHandler=()=>
  {
      setdisplayComments(!displayComments);
  }*/

  /*const passdeletedComment =(id)=>
    {
    }*/
  /*const checkDelete=()=>
    {
      if(isdeletedtweet)
        setdeletedtweet(false);
    }*/

  return (
    <React.Fragment>
      <div className="tweet">
        {/* <button onClick={deletepost}>karimm</button> */}
        {/* <img className="logo" src={Logo}/> */}
        {/* <div className="deleteIcon">{isAdmin==true && React.createElement(Delete)}</div> */}
        <div className="deleteIcon" onClick={checkifsameuser}>
          <NavLink to={`/Report/Lar/${postId}`}>
            <Button
              /*path={props.path}*/ onDeleteHandler={deletepost}
              postid={postId}
              sameuser={sameuser}
              isAdmin={isAdmin}
            />
          </NavLink>
        </div>
        <div className="userInfo">
          <Avatar
            className="profilePic"
            src={props.post.authorId.profileAvater.url}
          />
          <div className="profileInfo">
            <div className="username">
              <NavLink
                className="username"
                to={`/Profile/${props.post.authorId._id}`}
              >
                {username}
              </NavLink>
            </div>
            <div className="tag">
              <NavLink
                className="tag"
                to={`/Profile/${props.post.authorId._id}`}
              >
                {"@" + displayName}
              </NavLink>
            </div>
          </div>
        </div>
        {tweetcontent !== "No-text" && (
          <div className="tweetContent">{tweetcontent}</div>
        )}
        {props.post.gallery[0] ? (
          <img
            className="uploadedimage"
            alt="not found"
            key={props.post.gallery[0]._id}
            src={props.post.gallery[0].photo}
          />
        ) : (
          <></>
        )}
        {props.post.retweetedTweet && (
          <RetweetDisplayBlock
            key={props.post.retweetedTweet._id}
            username={props.post.retweetedTweet.authorId.screenName}
            tagName={props.post.retweetedTweet.authorId.tag}
            avatar={props.post.retweetedTweet.authorId.profileAvater.url}
            image={props.post.retweetedTweet.gallery[0]}
            authorId={props.post.retweetedTweet.authorId._id}
            content={props.post.retweetedTweet.text}
          />
        )}
        {date && (
          <div className="time">
            <p>
              {date.getDate()}/{date.getMonth()}/{date.getFullYear()}
              &nbsp;&nbsp;
            </p>
            <p>
              {date.getHours()}:{date.getMinutes()}
            </p>
          </div>
        )}
        <div className="reactsBar">
          <Reacts
            postId={postId}
            //count={count}
            numberOfRetweets={numberOfRetweets}
            numberOfLikes={props.post.likeCount}
            isLiked={props.post.isliked}
            setNumberOfRetweets={setNumberOfRetweets}
            //setCount={setCount}
            isPost={props.isPost}
            tweetcontent={tweetcontent}
            username={username}
            displayName={displayName}
            commentsCount={commentsperpost}
            image={props.post.gallery[0]}
            canretweet={canretweet}
            authorId={props.post.authorId._id}
            //CommentHandler={CommentHandler}
          />
        </div>
        {/*displayComments ? ( 
          comments.filter((comment) => comment.postid === postId).slice(0,displaylimit).map((comment) =>
            <Post
              key={comment.id}
              postid={comment.id}
              username={comment.username}
              tagName={comment.displayName}
              content={comment.content}
              hour={comment.commenthour}
              date={comment.date}
              //passdeletedTweet={passdeletedComment}
              isPost={false}
              commentsperpost={commentsperpost}
              setcommentsperpost={setcommentsperpost}
            />)
          ):(<></>)}
          <div className="loadmore">
          {displayComments && displayload && <LoadingButton
          size="small"
          onClick={handleClick}
          endIcon={<LoadMore />}
          loading={loading}
          loadingPosition="end"
          //variant="outlined"
          color="primary" 
        >
          Load More
        </LoadingButton>}
          </div>*/}
        {props.isPost && (
          <div className="comment">
            <Comment /*passData={passData}*/ />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
export default Post;

//className={isdeletedtweet===true? "nothingClass":"tweet"}
