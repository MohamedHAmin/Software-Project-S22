import React from "react";
import Avatar from '@mui/material/Avatar';
import "./Styles/RetweetDisplayBlock.css";
import { NavLink } from "react-router-dom";
/**
 * component displayed inside the post component if the post is a retweet
 * @param {string} key React special key prop
 * @param {string} username screenName of the user whose post is retweeted
 * @param {string} tagName tag of the user whose post is retweeted
 * @param {URL} avatar the url of the profile picture of the user whose post is retweeted
 * @param {string} authorId the id of the user whose post is retweeted (needed in routing to his profile) 
 * @param {string} content text written inside the retweeted post
 * @param {object} image an object that contains the url of the posted image in the retweeted post (if exists) as well as the image id 
 * @returns {div}
 *          <RetweetDisplayBlock key={props.post.retweetedTweet._id}
              username={props.post.retweetedTweet.authorId.screenName}
              tagName={props.post.retweetedTweet.authorId.tag}
              avatar={props.post.retweetedTweet.authorId.profileAvater.url}
              image={props.post.retweetedTweet.gallery[0]}
              authorId={props.post.retweetedTweet.authorId._id}
              content={props.post.retweetedTweet.text}/>
 */
function RetweetDisplayBlock(props) {
  return (
    <React.Fragment>
 
    <div className="comments" >
        {/* <button onClick={deletepost}>karimm</button> */}
        {/* <img className="logo" src={Logo}/> */}
        {/* <div className="deleteIcon">{isAdmin==true && React.createElement(Delete)}</div> */}
        <div className="userInfo">
            <Avatar className="profilePic" src={props.avatar}/>
            <div className="profileInfo">
            <div className="username"><NavLink className="username" to={`/Profile/${props.authorId}`} >{props.username}</NavLink></div>
                <div className="tag"><NavLink className="tag" to={`/Profile/${props.authorId}`} >{"@" + props.tagName}</NavLink></div>
            </div>
        </div>
        <div className="tweetContent">{props.content}</div>
        {props.image?.length>0?props.image.map(m=>(<img className="uploadedimage" alt="not found" key={props.image._id} src={props.image.photo}/>)):<></> }
    </div>
</React.Fragment>
    );
}
export default RetweetDisplayBlock;

//className={isdeletedtweet===true? "nothingClass":"tweet"}