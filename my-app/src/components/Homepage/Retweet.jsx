import React, { useState } from "react";
import Reacts from "./Reacts";
import moment from 'moment';
import Comment from "./Comment";
import Avatar from '@mui/material/Avatar';
import "./Styles/Post.css";
import Button from "./dropDownButton"
import comments from "./Arrays/comments"
import RetweetDisplayBlock from './RetweetDisplayBlock';
import Post from "./Post"
import LoadMore from '@mui/icons-material/MoreHoriz';
import LoadingButton from '@mui/lab/LoadingButton';
import posts from "./Arrays/posts"
import { NavLink } from "react-router-dom";
function Retweet(props){
const [numberOfRetweets,setNumberOfRetweets]=useState(props.numberOfRetweets);
const [count,setCount]=useState(props.count);
const [commentsperpost,setcommentsperpost]=useState(0);
const [retweetId]=useState(props.postid);
//const [postId]=useState(props.innerpostid);
const [username]=useState(props.username);
const [tweetcontent]=useState(props.content);
const [displayName]=useState(props.tagName);
const [displaylimit,setdisplaylimit] = useState(5);
const [displayload,setdisplayload] = useState(false);
const [loading, setLoading] = useState(false);
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
console.log(displayload);
console.log(displaylimit);
//const [count,setCount]=useState(comments.length);
//to get the content of the comments from the comment component
const passData = (data) => {
    comments.push({
        id:comments.length,
        postid:retweetId,
        username:"Ahmed_Emad",
        displayName:"AhmedEmad71",
        content:data
    });
    var temp=commentsperpost;
    temp++;
    setcommentsperpost(temp);
    if (temp > displaylimit)
    {
        setdisplayload(true);
    }
  };
  function deletepost(){   
    if(props.isPost)
    {
      console.log(retweetId);
      props.passdeletedTweet(retweetId); 
    }  
    else
    {
      console.log(retweetId);
      const index= comments.map((comment) => comment.id).indexOf(retweetId);
      comments.splice(index,1);
      var temp=props.commentsperpost;
      console.log(temp);
      temp--;
      props.setcommentsperpost(temp);
      console.log(temp);
    }
  };
  // const retweetCount=()=>
  //   {
  //       var temp=posts.filter((post)=> post.innerpostid===retweetId).length;
  //       setNumberOfRetweets(temp);
  //   }
  const [displayComments,setdisplayComments]=useState(false);
  const CommentHandler=()=>
  {
      setdisplayComments(!displayComments);
  }

    return(
        <React.Fragment>
            <div className="tweet">
        {/* <button onClick={deletepost}>karimm</button> */}
        {/* <img className="logo" src={Logo}/> */}
        {/* <div className="deleteIcon">{isAdmin==true && React.createElement(Delete)}</div> */}
        <div className="deleteIcon" ><a href='/Report'><Button onDeleteHandler={deletepost}/></a></div>
        <div className="userInfo">
            <Avatar className="profilePic" src="https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y"/>
            <div className="profileInfo">
            <div className="username"><NavLink className="username" to='/Profile' >{props.username}</NavLink></div>
                <div className="tag"><NavLink className="tag" to='/Profile' >{"@" + props.tagName}</NavLink></div>
            </div>
        </div>
        <div className="tweetContent">{props.content}</div>
        {props.image && <img className="uploadedimage" alt="not found" src={URL.createObjectURL(props.image)}/>}
        <div>
        <RetweetDisplayBlock key={props.innerid}
              username={props.innerusername}
              tagName={props.innerdisplayName}
              image={props.innerpostimage}
              content={props.innercontent}/>
        </div>
        <div className="time">
            <p>{props.hour}&nbsp;&nbsp;</p>
            <p>{props.date}</p>
        </div>
        <div className="reactsBar">
        <Reacts 
            postId={retweetId}
            count={count}
            numberOfRetweets={numberOfRetweets}
            setNumberOfRetweets={setNumberOfRetweets}
            setCount={setCount}
            isPost={props.isPost}
            tweetcontent={tweetcontent}
            username={username}
            displayName={displayName} 
          commentsCount={commentsperpost}
          CommentHandler={CommentHandler}/>
        </div>
        {displayComments ? ( 
          comments.filter((comment) => comment.postid === retweetId).slice(0,displaylimit).map((comment) =>
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
          </div>
        <div className="comment">
            <Comment passData={passData}/>
        </div>
    </div>

        </React.Fragment>
    );
}
export default Retweet;