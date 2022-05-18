import React from "react";
import "./Styles/FollowerCard.css";
import { Avatar, Button, Typography, Modal } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
/**
 *
 * @param {props} props Setting the information of my followers.
 * @returns Returns the setted the information of my followers.
 */
function SearchFollowers(props) {
  let { id } = useParams();
  const [isFollowed, setIsFollowed] = useState(props.contact.isfollowed);
  const [followModalState, setFollowModalState] = useState(false);
  let userID = localStorage.getItem("userId");
  const [Followers, setFollowers] = useState(0);
  const [isPending, setIsPending] = useState(props.contact.ispending);
  /**
   * Handling the following request
   */
  function handleButtonClick() {
    if(isPending===false)
    {  
    console.log(isFollowed);
    if (isFollowed) {
      setFollowModalState(true);
    } else {
      axios
        .post(
          `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/user/${userID}/follow/${props.contact._id}`,
          null,
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          setFollowers(Followers + 1);

          setIsFollowed(true);
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          setFollowModalState(true); // 'Oops!'
        });
    }
  }
  else{
   handleUnfollowAction();
   setIsPending(false);
  }
  }
  /**
   * Handling the unfollowing request
   */
  function handleUnfollowAction() {
    axios
      .post(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/user/${userID}/unfollow/${props.contact._id}`,
        null,
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        if(isPending===true)
        {
          setIsPending(false);
        }
        else
        {
        console.log(res);
        setFollowers(Followers - 1);
        setFollowModalState(false);
        setIsFollowed(false);
        window.location.reload();
        }
      })
      .catch((err) => {}); // 'Oops!';
  }
  function handleCancelAction() {
    setFollowModalState(false);
  }
  console.log(props.contact);
  return (
    <div className="FollowerCard searchCard">
      <NavLink to={`/Profile/${props.contact._id}`}>
        <div className="FollowingCard" style={{}}>
          <div>
            <Avatar
              style={{ marginRight: "4px" }}
              src={props.contact.profileAvater.url}
              alt={props.contact.screenName}
            />{" "}
          </div>

          <div className="FollowerData">
            <p
              style={{ margin: "0px 0px 4px 4px", color: "var(--color-mode)" }}
            >
              <b>{props.contact.screenName}</b>
            </p>

            <p
              style={{
                margin: "-7px 0px 4px 4px",
                fontSize: "13px",
                color: "var(--color-mode)",
                opacity: "0.8",
              }}
            >
              @{props.contact.tag}
            </p>

            <h6
              style={{
                margin: "0px 0px 4px 4px",
                fontSize: "13px",
                color: "var(--color-mode)",
              }}
            >
              {props.contact.Biography}
            </h6>
          </div>
        </div>
      </NavLink>

      <Modal
        open={followModalState}
        onClose={handleCancelAction}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        keepMounted
      >
        <FormControl className="editProfileCloseContainer">
          <Typography id="modal-modal-title" variant="h6">
            Unfollow @{props.contact.tag}?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Their Tweets will no longer show up in your home timeline. You can
            still view their profile, unless their Tweets are protected.
          </Typography>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={handleUnfollowAction}
              className="profileDiscardContainerButton"
              data-testid="Follow-Profile-Pop-Button"
            >
              Unfollow
            </Button>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={handleCancelAction}
              className="profileCloseContainerButton"
            >
              Cancel
            </Button>
          </div>
        </FormControl>
      </Modal>
      {props.contact._id !== userID ? (
        <Button
          onClick={handleButtonClick}
          className={
            props.contact.isfollowed ? " searchFollow1" : " searchFollow2"
          }
          // "followButton1 " : "followButton2"
        >
          {isPending?("Pending"):(props.contact.isfollowed ? "Following" : "Follow")}
        </Button>
      ) : null}
    </div>
  );
}

export default SearchFollowers;
