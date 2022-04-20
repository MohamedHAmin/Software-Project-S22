import React, { useState ,useEffect } from "react";
import Reacts from "./Reacts";
import moment from 'moment';
import Comment from "./Comment";
import Avatar from '@mui/material/Avatar';
import Logo from "../../Images/Logo Title Page.png"
import Delete from '@mui/icons-material/DeleteOutlined';
import "./Styles/Post.css";
import Button from "./dropDownButton"
import comments from "./Arrays/comments"
import RetweetDisplayBlock from './RetweetDisplayBlock';
import LoadMore from '@mui/icons-material/MoreHoriz';
import LoadingButton from '@mui/lab/LoadingButton';
import posts from "./Arrays/posts"
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Post(props) {
const [isdeletedtweet,setdeletedtweet]=useState(false);
//   deletepost(()=>{
//     setdeletedtweet(true)
//     },[])
const [postId]=useState(props.postid);
//var index=posts.map((post)=>post.id).indexOf(postId);
/*posts[index].numberOfRetweets.length*/
const [numberOfRetweets,setNumberOfRetweets]=useState(props.numberOfRetweets);
console.log(numberOfRetweets);
console.log(props.numberOfRetweets);
const [commentsperpost,setcommentsperpost]=useState(0);
const [username]=useState(props.username);
const [tweetcontent]=useState(props.content);
const [displayName]=useState(props.tagName);
const [content, setContent] = useState("");
const [displaylimit,setdisplaylimit] = useState(5);
const [displayload,setdisplayload] = useState(false);
const [loading, setLoading] = useState(false);
console.log(comments);
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
const [count,setCount]=useState(props.count);
//let tmp=comments.filter((comment) => comment.postid === postId);
//console.log(tmp);
//to get the content of the comments from the comment component
const passData = (data) => {
    setContent(data);
    comments.push({
        id:comments.length,
        postid:postId,
        username:"Ahmed_Emad",
        displayName:"AhmedEmad71",
        content:data,
        commenthour:moment().format('hh:mm'),
        commentdate:moment().format('DD/MM/YYYY')
    });
    /*var temp=count;
    temp++;
    setCount(temp);*/
    var temp=commentsperpost;
    temp++;
    setcommentsperpost(temp);
    if (commentsperpost > displaylimit)
    {
        setdisplayload(true);
    }
  };
function deletepost(){   
  if(props.isPost)
  {
    console.log(postId);

    props.passdeletedTweet(postId); 
    //retweetCount();
  }  
  else
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
} 
// const retweetCount=()=>
//     {
//         var temp=posts.filter((post)=> post.innerpostid===postId).length;
//         setNumberOfRetweets(temp);
//     }
  const [isAdmin]=useState(true);
  const [text,setText] =useState("");
  const [displayComments,setdisplayComments]=useState(false);
  const CommentHandler=()=>
  {
      setdisplayComments(!displayComments);
  }
    useEffect(()=>{
    setText(props.post)
    },[props.post])

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
        <div className="deleteIcon" ><NavLink to='/Report'><Button onDeleteHandler={deletepost}/></NavLink></div>
        <div className="userInfo">
            <Avatar className="profilePic"/>
            <div className="profileInfo">
                <div className="username"><NavLink className="username" to='/Profile' >{props.username}</NavLink></div>
                <div className="tag"><NavLink className="tag" to='/Profile' >{"@" + props.tagName}</NavLink></div>
            </div>
        </div>
        <div className="tweetContent">{props.content}</div>
        {props.image && <img className="uploadedimage" alt="not found" src={URL.createObjectURL(props.image)}/>}
        <div className="time">
            <p>{props.hour}&nbsp;&nbsp;</p>
            <p>{props.date}</p>
        </div>
        <div className="reactsBar">
            <Reacts 
            postId={postId}
            count={count}
            numberOfRetweets={numberOfRetweets}
            setNumberOfRetweets={setNumberOfRetweets}
            setCount={setCount}
            isPost={props.isPost}
            tweetcontent={tweetcontent}
            username={username}
            displayName={displayName} 
          commentsCount={commentsperpost}
          image={props.image}
          CommentHandler={CommentHandler}/>
        </div>
        {displayComments ? ( 
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
          </div>
        {props.isPost && <div className="comment">
            <Comment passData={passData}/>
        </div>}
    </div>
</React.Fragment>
    );
}
export default Post;

//className={isdeletedtweet===true? "nothingClass":"tweet"}