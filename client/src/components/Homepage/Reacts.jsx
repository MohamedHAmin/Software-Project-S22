import React,{useState} from "react";
import ReactsIcon from "./ReactsIcon";
import CommentIcon from "@mui/icons-material/ModeCommentOutlined";
import RetweetIcon from '@mui/icons-material/AutorenewOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Filledlike from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import "./Styles/Reacts.css";
import TweetBar from './TweetBar';
import { Box } from "@mui/system";
import moment from 'moment';
import CommentDisplayBlock from './RetweetDisplayBlock';
import { Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import posts from './Arrays/posts';
import axios from "axios";
import { PhotoCamera } from '@mui/icons-material/PhotoCamera';

/**
 * Reacts on a certain post (like/dislike, retweet and comment)
 * @param {string} postId the id of the meant post
 * @param {number} numberOfRetweets number of retweets on the meant post
 * @param {number} numberOfLikes number of likes on the meant post
 * @param {number} numberOfComments number of comments on the meant post  
 * @param {boolean} isLiked indicates whether or not the user liked this post or not (to show dislike option)
 * @param {boolean} isPost indicates whether this post is a tweet/retweet or if is is a comment on a post
 * @param {string} tweetcontent text written inside the meant post (to be sent to BE if retweet option is selected)
 * @param {object} image an object that contains the url of the posted image (if exists) as well as the image id
 * @param {string} username the screenName of the user who posted the tweet
 * @param {string} displayName the tag of the user who posted the tweet
 * @param {string} authorId the id of the user who posted the tweet (needed in routing to his profile) 
 * @param {object} setNumberOfRetweets function from parent to change the state of current number of retweets on the post if the post is retweeted if the BE request was successful
 * @param {boolean} canretweet indicates whether this post can be retweeted or not (the post can't be retweeted if it is a retweet with no caption)
 * @returns {div}
 *          <Reacts 
            postId={postId}
            numberOfRetweets={numberOfRetweets}
            numberOfLikes={props.post.likeCount}
            isLiked={props.post.isliked}
            setNumberOfRetweets={setNumberOfRetweets}
            isPost={props.isPost}
            tweetcontent={tweetcontent}
            username={username}
            displayName={displayName} 
            image={props.post.gallery[0]}
            canretweet={canretweet}
            authorId={props.post.authorId._id}
            />
 */
function Reacts (props) {
    //const [numberOfComments,setNumberOfComments]=useState(0);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    function onimgSelectedChange(newimg) 
    {  
      setSelectedImage(newimg);
    }
    const handleClose = () => setOpen(false);
    const handleOpen = () => 
    {
        if(!open && props.canretweet)
        setOpen(true);
    }
    const [numberOfLikes,setNumberOfLikes]=useState(props.numberOfLikes);
    const [likeStatus,setLikeStatus]=useState(props.isLiked);
    const [value, setValue] = useState("");
    const Like=()=>{
        setNumberOfLikes(numberOfLikes+1);
        setLikeStatus(true);
    }
    const Unlike=()=>{
        setNumberOfLikes(numberOfLikes-1);
        setLikeStatus(false);
    }
    const LikeClickHandler=()=>{
        axios.put(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/tweet/${props.postId}/like`,{},{headers: {Authorization: localStorage.getItem("accessToken")}}).then((res)=>
        {
            console.log(res);
            if(res.error)
            {
              alert("something went wrong");
            }
            else
            {
                if(res.data.isliked)
                {
                    Like();
                }
                else
                {
                    Unlike();
                }
            }
        })
        .catch((err) => {
            //err.message; // 'Oops!'
            alert(err.response.data.error);
            console.log(err);
          });
    }
    const RetweetHandler=()=>{
        let data=
        {
            text: value,
            retweetedTweet:props.postId
        };
      if(value==="")
      {
          data.text="No-text";
      }
        axios.post(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/retweet`, data,{headers: {Authorization: localStorage.getItem("accessToken")}}).then((res)=>
      {
        console.log(res);
          if(res.error)
          {
            alert("something went wrong");
          }
          else
          {
              handleClose();
              setValue("");
              props.setNumberOfRetweets(props.numberOfRetweets+1);
              window.location.reload();
          }
    })
    .catch((err) => {
        //err.message; // 'Oops!'
        alert(err.response.data.error);
        console.log(err);
      });
}
        return (
            <div className="reactsBar">
                {props.isPost && (
                    <React.Fragment>
                <div className="icon" id="react1" onClick={props.CommentHandler}><ReactsIcon text="Comment" number={props.commentsCount} Icon={CommentIcon}/></div>
                <button className="icon" id="react2" onClick={handleOpen}><ReactsIcon text="Retweet" number={props.numberOfRetweets} Icon={RetweetIcon}/>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                <Box className="RetweetPopup">
                    <span className="RetweetHeader">
                    <IconButton onClick={handleClose}>
                    <CloseIcon className="close"/>
                    </IconButton>   
                <Typography id="modal-modal-title" variant="h6" component="h5">
                    Retweet
                </Typography>    
                    </span>
                <textarea type="text" variant="standard" value={value} className="Retweettext" onChange={(e)=>{setValue(e.target.value)}} placeholder="Add Comment"/>
                {selectedImage? (
            <div>
            <img alt="not found" width={"inherit"} key={props.image._id} src={props.image.photo} />
            <br />
            </div>):<></>}
                <CommentDisplayBlock className="retweetinnerblock" key={props.id}
              username={props.username}
              tagName={props.displayName}
              image={props.image}
              authorId={props.authorId?._id}
              avatar={props.authorId?.profileAvater.url}
              content={props.tweetcontent}/> 
              <TweetBar postHandeler={RetweetHandler} onimgChange={onimgSelectedChange}/>   
                </Box>    
                </Modal>
                </button> 
                </React.Fragment>)}
                <div className="icon" id="react3" onClick={LikeClickHandler}>
                    {!likeStatus && <ReactsIcon text="Like" number={numberOfLikes} Icon={LikeIcon}/>}
                    {likeStatus && <ReactsIcon text="Dislike" number={numberOfLikes} Icon={Filledlike}/>}
                </div>
            </div>
        );
} 
export default Reacts;