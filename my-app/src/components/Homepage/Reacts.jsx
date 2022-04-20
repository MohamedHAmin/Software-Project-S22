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
function Reacts (props) {
    //const [numberOfComments,setNumberOfComments]=useState(0);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    function onimgSelectedChange(newimg) {  setSelectedImage(newimg);}
    const handleClose = () => setOpen(false);
    const handleOpen = () => 
    {
        if(!open)
        setOpen(true);
        //setclose(false);
    }
    console.log(selectedImage);
    //const [close, setclose]=useState(false);
    //const [numberOfRetweets,setNumberOfRetweets]=useState(props.numberOfRetweets);
    const [numberOfLikes,setNumberOfLikes]=useState(0);
    const [likeStatus,setLikeStatus]=useState(false);
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
        if(likeStatus==true)
        Unlike();
        else
        Like();
    }
    const RetweetHandler=()=>{
        posts.push({
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
        });
        handleClose();
        setValue("");
        var index=posts.map((post)=>post.id).indexOf(props.postId);
        console.log(index);
        console.log(posts[index].numberOfRetweets);
        posts[index].numberOfRetweets=posts[index].numberOfRetweets+1;
        console.log(posts[index].numberOfRetweets);
        props.setNumberOfRetweets(props.numberOfRetweets+1);
        /*var temp=posts.filter((post)=> post.innerpostid===props.postId);
        setNumberOfRetweets(temp);*/
        props.setCount(props.count+1);
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
                {selectedImage ? (
            <div>
            <img alt="not found" width={"inherit"} src={URL.createObjectURL(selectedImage)} />
            <br />
            </div>):<></>}
                <CommentDisplayBlock className="retweetinnerblock" key={props.id}
              username={props.username}
              tagName={props.displayName}
              image={props.image}
              content={props.tweetcontent}/> 
              <TweetBar postHandeler={RetweetHandler} onimgChange={onimgSelectedChange}/>   
                </Box>    
                </Modal>
                </button> 
                </React.Fragment>)}
                <div className="icon" id="react3" onClick={LikeClickHandler}>
                    {!likeStatus && <ReactsIcon text="Like" number={numberOfLikes} Icon={LikeIcon}/>}
                    {likeStatus && <ReactsIcon text="Disike" number={numberOfLikes} Icon={Filledlike}/>}
                </div>
            </div>
        );
} 
export default Reacts;