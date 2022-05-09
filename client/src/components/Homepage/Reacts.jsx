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
        //setclose(false);
    }
    //const [close, setclose]=useState(false);
    //const [numberOfRetweets,setNumberOfRetweets]=useState(props.numberOfRetweets);
    const [numberOfLikes,setNumberOfLikes]=useState(props.numberOfLikes);
    const [likeStatus,setLikeStatus]=useState(props.isLiked);
    const [value, setValue] = useState("");
    /*const handleClosebtn=()=>
    {
        setclose(true);
    }*/
    const Like=()=>{
        setNumberOfLikes(numberOfLikes+1);
        setLikeStatus(true);
    }
    const Unlike=()=>{
        setNumberOfLikes(numberOfLikes-1);
        setLikeStatus(false);
    }
    const LikeClickHandler=()=>{
        axios.put(`http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/tweet/${props.postId}/like`,{},{headers: {Authorization: localStorage.getItem("accessToken")}}).then((res)=>
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
        /*posts.push({
            id:props.count,
            innerpostid:props.postId,
            username:"Ahmed_Emad",
            displayName:"AhmedEmad71",
            content:value,
            posthour:moment().format('hh:mm'),
            postdate:moment().format('DD/MM/YYYY'),
            numberOfRetweets:0,
            innerpostimage:props.image,
            images:selectedImage
        });*/
        let data=
        {
            text: value,
            retweetedTweet:props.postId
        };
      if(value==="")
      {
          data.text="No-text";
      }
        axios.post(`http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/retweet`, data,{headers: {Authorization: localStorage.getItem("accessToken")}}).then((res)=>
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
        /*var index=posts.map((post)=>post.id).indexOf(props.postId);
        console.log(index);
        console.log(posts[index].numberOfRetweets);
        posts[index].numberOfRetweets=posts[index].numberOfRetweets+1;
        console.log(posts[index].numberOfRetweets);*/
        /*var temp=posts.filter((post)=> post.innerpostid===props.postId);
        setNumberOfRetweets(temp);*/
        //props.setCount(props.count+1);
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
              authorId={props.authorId}
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