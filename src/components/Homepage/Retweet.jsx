import React, { useState } from "react";
import Reacts from "./Reacts";
import moment from 'moment';
import Comment from "./Comment";
import Avatar from '@mui/material/Avatar';
import "./Styles/Post.css";
import Button from "./dropDownButton"
import comments from "./Arrays/comments"
import CommentDisplayBlock from './CommentDisplayBlock';
import LoadMore from '@mui/icons-material/MoreHoriz';
import LoadingButton from '@mui/lab/LoadingButton';

function Retweet(props){
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
  const [displayComments,setdisplayComments]=useState(false);
  const CommentHandler=()=>
  {
      setdisplayComments(!displayComments);
  }

    return(
        <React.Fragment>
            <div className="tweet" >
        {/* <button onClick={deletepost}>karimm</button> */}
        {/* <img className="logo" src={Logo}/> */}
        {/* <div className="deleteIcon">{isAdmin==true && React.createElement(Delete)}</div> */}
        <div className="deleteIcon" ><a href='/Report'><Button /></a></div>
        <div className="userInfo">
            <Avatar className="profilePic"/>
            <div className="profileInfo">
                <div className="username"><a href='/Profile' >{props.username}</a></div>
                <div className="tag"><a href='/Profile' >{"@" + props.tagName}</a></div>
            </div>
        </div>
        <div className="tweetContent">{props.content}</div>
        <div>
        <CommentDisplayBlock key={props.innerid}
              username={props.innerusername}
              tagName={props.innerdisplayName}
              content={props.innercontent}/>
        </div>
        <div className="time">
            <p>{moment().format('hh:mm')}&nbsp;&nbsp;</p>
            <p>{moment().format('DD/MM/YYYY')}</p>
        </div>
        <div className="reactsBar">
            <Reacts postId={retweetId} tweetcontent={tweetcontent} username={username} displayName={displayName} commentsCount={commentsperpost} CommentHandler={CommentHandler}/>
        </div>
        {displayComments ? ( 
          comments.filter((comment) => comment.postid === retweetId).slice(0,displaylimit).map((comment) =>
            <CommentDisplayBlock
              key={comment.id}
              username={comment.username}
              tagName={comment.displayName}
              content={comment.content}
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