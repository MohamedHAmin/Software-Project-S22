import React,{useState} from "react";
import ReactsIcon from "./ReactsIcon";
import CommentIcon from "@mui/icons-material/ModeCommentOutlined";
import RetweetIcon from '@mui/icons-material/AutorenewOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';

import "./Styles/Reacts.css";
function Reacts () {
    const [numberOfComments,setNumberOfComments]=useState(0);
    const [numberOfRetweets,setNumberOfRetweets]=useState(0);
    const [numberOfLikes,setNumberOfLikes]=useState(0);
    const [likeStatus,setLikeStatus]=useState("unlike");
    const Like=()=>{
        setNumberOfLikes(numberOfLikes+1);
        setLikeStatus("like");
    }
    const Unlike=()=>{
        setNumberOfLikes(numberOfLikes-1);
        setLikeStatus("unlike");
    }
    const LikeClickHandler=()=>{
        if(likeStatus=="like")
            Unlike();
        else
            Like();
    }
    const RetweetHandler=()=>{
        setNumberOfRetweets(numberOfRetweets+1);
    }
        return (
            <div className="reactsBar">
                <div className="icon" id="1"><ReactsIcon text="Comment" number={numberOfComments} Icon={CommentIcon}/></div>
                <div className="icon" id="2" onClick={RetweetHandler}><ReactsIcon text="Retweet" number={numberOfRetweets} Icon={RetweetIcon}/></div>
                <div className="icon" id="3" onClick={LikeClickHandler}><ReactsIcon text="Like" number={numberOfLikes} Icon={LikeIcon}/></div>
            </div>
        );
}
 
export default Reacts;