import React, { useState, useEffect } from "react";
import Reacts from "./Reacts";
import Comment from "./Comment";
import Avatar from "@mui/material/Avatar";
import "./Styles/Post.css";
import CommentDisplayBlock from "./CommentDisplayBlock";
import Button from "./dropDownButton";
import RetweetDisplayBlock from "./RetweetDisplayBlock";
import LoadMore from "@mui/icons-material/MoreHoriz";
import LoadingButton from "@mui/lab/LoadingButton";
import { NavLink } from "react-router-dom";
import axios from "axios";
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
function PostReplies(props) {
  const [postId] = useState(props.post.tweetId?._id);
  const date = new Date(props.post.tweetId?.createdAt);
  const [isPrivate] = useState(props.post.isPrivate);
  const [isAdmin] = useState(props.isAdmin);
  const [canretweet, setcanretweet] = useState(true);
  const [numberOfRetweets, setNumberOfRetweets] = useState(
    props.post.tweetId?.retweetCount
  );
  const [commentsperpost, setcommentsperpost] = useState(
    props.post.tweetId?.replyCount
  );
  const [username] = useState(props.post.tweetId?.authorId.screenName);
  const [tweetcontent] = useState(props.post.tweetId?.text);
  const [displayName] = useState(props.post.tweetId?.authorId.tag);
  const [sameuser, setsameuser] = useState(false);
  //const [comments] = useState(props.post.reply);
  const [displaylimit, setdisplaylimit] = useState(1);
  const [displayload, setdisplayload] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (tweetcontent === " " && !props.post.tweetId?.gallery[0]) {
      setcanretweet(false);
    }
    // axios
    //   .get(
    //     `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/tweet/${postId}`,
    //     { headers: { Authorization: localStorage.getItem("accessToken") } }
    //   )
    //   .then((res) => {
    //     if (res.error) {
    //       console.log("There was error while attempting to retrieve tweet");
    //     } else {
    //       setComments(res.data.reply);
    //       console.log(res.data.reply);
    //     }
    //   });
  }, []);
  function handleClick() {
    setLoading(true);
    if (commentsperpost > displaylimit) {
      var temp = displaylimit;
      temp = displaylimit + 5;
      setdisplaylimit(temp);
      if (commentsperpost <= temp) {
        setdisplayload(false);
      }
    }
    setLoading(false);
  }
  const passData = (text) => {
    let data = {
      text: text,
      replyingTo: postId,
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
  function checkifsameuser() {
    if (props.post.tweetId?.authorId.id === localStorage.getItem("userId")) {
      setsameuser(true);
    }
  }

  function deletepost() {
    props.passdeletedTweet(postId);
  }

  return (
    <React.Fragment>
      <div className="tweet">
        {isPrivate ? "This content is private" : <></>}
        {props.post.tweetId ? (
          <div>
            <div className="deleteIcon" onClick={checkifsameuser}>
              <NavLink to={`/Report/Lar/${postId}`}>
                <Button
                  onDeleteHandler={deletepost}
                  postid={postId}
                  sameuser={sameuser}
                  isAdmin={isAdmin}
                />
              </NavLink>
            </div>

            <div className="userInfo">
              <Avatar
                className="profilePic"
                src={props.post.tweetId?.authorId.profileAvater.url}
              />
              <div className="profileInfo">
                <div className="username">
                  <NavLink
                    className="username"
                    to={`/Profile/${props.post.tweetId?.authorId._id}`}
                  >
                    {username}
                  </NavLink>
                </div>
                <div className="tag">
                  <NavLink
                    className="tag"
                    to={`/Profile/${props.post.tweetId?.authorId._id}`}
                  >
                    {"@" + displayName}
                  </NavLink>
                </div>
              </div>
            </div>
            {tweetcontent !== "No-text" && (
              <div className="tweetContent">{tweetcontent}</div>
            )}
            <div className="image-containerx">
              {props.post.tweetId?.gallery.length > 0 ? (
                props.post.tweetId?.gallery.map((m) => (
                  <img
                    className="uploadedimage"
                    alt="not found"
                    key={m._id}
                    src={m.photo}
                  />
                ))
              ) : (
                <></>
              )}
            </div>
            {props.post.tweetId.retweetedTweet.tweetId?.authorId && (
              <RetweetDisplayBlock
                key={props.post.tweetId.retweetedTweet.tweetId?._id}
                username={
                  props.post.tweetId.retweetedTweet.tweetId?.authorId
                    ?.screenName
                }
                tagName={
                  props.post.tweetId.retweetedTweet.tweetId?.authorId?.tag
                }
                avatar={
                  props.post.tweetId.retweetedTweet.tweetId?.authorId
                    ?.profileAvater.url
                }
                image={props.post.tweetId.retweetedTweet.tweetId?.gallery}
                authorId={
                  props.post.tweetId.retweetedTweet.tweetId?.authorId?._id
                }
                content={props.post.tweetId.retweetedTweet.tweetId?.text}
              />
            )}
            {props.post.tweetId.retweetedTweet.tweetExisted == true &&
              !props.post.tweetId.retweetedTweet.tweetId && (
                <div className="comments">This Lar has been deleted</div>
              )}
            {props.post.tweetId?.createdAt && (
              <div className="time">
                <p>
                  {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
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
                numberOfRetweets={numberOfRetweets}
                numberOfLikes={props.post.tweetId?.likeCount}
                isLiked={props.post.tweetId?.isliked}
                setNumberOfRetweets={setNumberOfRetweets}
                isPost={props.isPost}
                tweetcontent={tweetcontent}
                username={username}
                displayName={displayName}
                commentsCount={commentsperpost}
                image={props.post.tweetId?.gallery}
                canretweet={canretweet}
                authorId={props.post.tweetId?.authorId}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
        {props.canviewcomments && props.post.reply ? (
          <CommentDisplayBlock
            post={props.post.reply}
            isAdmin={props.isAdmin}
            isPost={true}
            ReplyOnReply={false}
            canviewcomments={true}
            clicked={true}
          />
        ) : (
          <></>
        )}
        <div className="loadmore">
          {displayload && (
            <LoadingButton
              size="small"
              onClick={handleClick}
              endIcon={<LoadMore />}
              loading={loading}
              loadingPosition="end"
              color="primary"
            >
              Load More
            </LoadingButton>
          )}
        </div>
        {props.isPost && props.post.tweetId ? (
          <div className="comment">
            <Comment passData={passData} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </React.Fragment>
  );
}

export default PostReplies;
