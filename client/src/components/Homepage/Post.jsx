import React, { useState ,useEffect } from "react";
import Reacts from "./Reacts";
import Comment from "./Comment";
import Avatar from '@mui/material/Avatar';
import "./Styles/Post.css";
import CommentDisplayBlock from "./CommentDisplayBlock";
import Button from "./dropDownButton"
import RetweetDisplayBlock from './RetweetDisplayBlock';
import LoadMore from '@mui/icons-material/MoreHoriz';
import LoadingButton from '@mui/lab/LoadingButton';
import { NavLink,useParams } from "react-router-dom";
import axios from 'axios';
/**
 * post component that is called to map tweets or retweets (it contains structure of tweet or retweet as well as reactsbar where users can comment, retweet or like the tweet)
 * @component
 * @param {object} post an object that contains all needed details about a certain post
 * @param {boolean} isAdmin indicates whether or not this user is an admin to be passed in drpdownbutton component (to display delete option not report option)
 * @param {boolean} isPost indicates whether this post is a tweet/retweet or if is is a comment on a post
 * @param {object} passdeletedTweet a function that takes id of tweet from child component (post) and pass it to the parent component (homepage) to call BE
 * @returns {div}
 *           <Post
              post={post}
              passdeletedTweet={passdeletedTweet}
              isAdmin={props.isAdmin}
              isPost={true}>
 */
function Post(props) {
  const [postId]=useState(props.post._id);
  const date=new Date(props.post.createdAt);
  const [isAdmin]=useState(props.isAdmin);
  const [hasimage,sethasimage]=useState(false);
  const [canretweet,setcanretweet]=useState(true);
  const [numberOfRetweets,setNumberOfRetweets]=useState(props.post.retweetCount);
  const [commentsperpost,setcommentsperpost]=useState(props.post.replyCount);
  const [username]=useState(props.post.authorId.screenName);
  const [tweetcontent]=useState(props.post.text);
  const [displayName]=useState(props.post.authorId.tag);
  const [sameuser,setsameuser]=useState(false);
  const [comments,setComments]=useState([]);
  const [displaylimit,setdisplaylimit] = useState(5);
  const [displayload,setdisplayload] = useState(false);
  const [loading, setLoading] = useState(false);
  localStorage.setItem("screenName",props.post.authorId.screenName)
  // alert(screenName);
useEffect(()=>{
  if(tweetcontent==="No-text" && !props.post.gallery[0])
  {
    setcanretweet(false);
  }
  axios.get(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/tweet/${postId}`,
  { headers: { Authorization: localStorage.getItem("accessToken") }}).then((res) => {
    if (res.error) {
      console.log(
        "There was error while attempting to retrieve tweet"
      );
    } else {
      setComments(res.data.reply);
      console.log(res.data.reply);
    }
  });
},[])
function handleClick() {
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
}
const passData = (text) => {
  let data={
    text:text,
    replyingTo:postId
  };
  axios
        .post(
          `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/reply`,
          data,
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          console.log(res);
          if (res.error) {
            alert("something went wrong");
          } else {
            window.location.reload();
          }
        })
        .catch((err) => {
          //err.message; // 'Oops!'
          alert(err.response.data.error);
          console.log(err);
        });
  };
  function checkifsameuser()
  {
    if(props.post.authorId._id===localStorage.getItem("userId"))
    {
        setsameuser(true);
    }
  }

function deletepost(){   
  props.passdeletedTweet(postId);
}
  const [displayComments,setdisplayComments]=useState(false);
  const CommentHandler=()=>
  {
      setdisplayComments(!displayComments);
      if(comments.length > displaylimit)
      {
        setdisplayload(true);;
      }
  }
  return (
    <React.Fragment>
 
    <div className="tweet">
        <div className="deleteIcon" onClick={checkifsameuser}><NavLink to={`/Report/Lar/${postId}`}><Button onDeleteHandler={deletepost} postid={postId}  sameuser={sameuser} isAdmin={isAdmin}/></NavLink></div>
        <div className="userInfo">
            <Avatar className="profilePic" src={props.post.authorId.profileAvater.url}/>
            <div className="profileInfo">
                <div className="username"><NavLink className="username" to={`/Profile/${props.post.authorId._id}`} >{username}</NavLink></div>
                <div className="tag"><NavLink className="tag" to={`/Profile/${props.post.authorId._id}`} >{"@" + displayName}</NavLink></div>
            </div>
        </div>
        {tweetcontent!=="No-text" && <div className="tweetContent">{tweetcontent}</div>}
        <div className="image-containerx">
        {props.post.gallery.length>0?props.post.gallery.map(m=>(<img className="uploadedimage" alt="not found" key={m._id} src={m.photo}/>)):<></> }
        </div>
        {props.post.retweetedTweet?.tweetId && <RetweetDisplayBlock key={props.post.retweetedTweet.tweetId._id}
              username={props.post.retweetedTweet.tweetId.authorId.screenName}
              tagName={props.post.retweetedTweet.tweetId.authorId.tag}
              avatar={props.post.retweetedTweet.tweetId.authorId.profileAvater.url}
              image={props.post.retweetedTweet.tweetId.gallery}
              authorId={props.post.retweetedTweet.tweetId.authorId._id}
              content={props.post.retweetedTweet.tweetId.text}/>}
        {(props.post.retweetedTweet?.tweetExisted==true && !props.post.retweetedTweet?.tweetId) && <div className="comments">This Lar has been deleted</div>}
        {props.post.createdAt && <div className="time">
            <p>{date.getDate()}/{date.getMonth()+1}/{date.getFullYear()}&nbsp;&nbsp;</p>
            <p>{date.getHours()}:{date.getMinutes()}</p>
        </div>}
        <div className="reactsBar">
            <Reacts 
            postId={postId}
            numberOfRetweets={numberOfRetweets}
            numberOfLikes={props.post.likeCount}
            isLiked={props.post.isliked}
            setNumberOfRetweets={setNumberOfRetweets}
            isPost={props.isPost}
            tweetcontent={tweetcontent}
            username={username}
            displayName={displayName} 
            commentsCount={commentsperpost}
            image={props.post.gallery}
            canretweet={canretweet}
            authorId={props.post.authorId}
            CommentHandler={CommentHandler}
            />
        </div>
        {(props.canviewcomments && displayComments) ? ( 
          comments.slice(0,displaylimit).map((comment) =>
            <CommentDisplayBlock
              post={comment}
              //passdeletedTweet={deletepost}
              isAdmin={props.isAdmin}
              isPost={true}
              ReplyOnReply={false}
              canviewcomments={props.canviewcomments}
            />)
          ):(<></>)}
          <div className="loadmore">
          {displayComments && displayload && <LoadingButton
          size="small"
          onClick={handleClick}
          endIcon={<LoadMore />}
          loading={loading}
          loadingPosition="end"
          color="primary" 
        >
          Load More
        </LoadingButton>}
          </div>
        {props.isPost && <div className="comment">
            <Comment passData={passData}/>
        </div>}
    </div>
</React.Fragment>
    );
}
export default Post;