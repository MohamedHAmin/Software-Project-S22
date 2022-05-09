import React from "react";
import "./Styles/FollowingCard.css";
import { Avatar, Button, Typography, Modal } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
function FollowingCard(props) {
  let { id } = useParams();
  const [isFollowed, setIsFollowed] = useState(props.contact.isfollowing);
  const [followModalState, setFollowModalState] = useState(false);
  let userID = localStorage.getItem("userId");
  const [Followers, setFollowers] = useState(0);

  function handleButtonClick() {
    console.log(isFollowed);
    if (isFollowed) {
      setFollowModalState(true);
    } else {
      axios
        .post(
          `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com//api/user/${userID}/follow/${props.contact.followingId._id}`,
          null,
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          setFollowers(Followers + 1);
          //profileData.followercount=Followers+1
          setIsFollowed(true);
          console.log(res);
          window.location.reload();
        })
        .catch((err) => {
          setFollowModalState(true); // 'Oops!'
        });
    }
  }
  //console.log(isFollowed);
  //console.log(userID);
  //console.log(id);
  function handleUnfollowAction() {
    axios
      .post(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com//api/user/${userID}/unfollow/${props.contact.followingId._id}`,
        null,
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        console.log(res);
        setFollowers(Followers - 1);
        setFollowModalState(false);
        setIsFollowed(false);
        window.location.reload();
      })
      .catch((err) => {}); // 'Oops!';
  }
  function handleCancelAction() {
    setFollowModalState(false);
  }
  return (
    <div className="FollowingCard">
      <NavLink to={`/Profile/${props.contact.followingId._id}`}>
        <div className="FollowingCard">
          <div>
            <Avatar
              style={{ marginRight: "4px" }}
              src={props.contact.followingId.profileAvater.url}
              alt={props.contact.followingId.screenName}
            />
          </div>

          <div className="FollowingData">
            <p
              style={{ margin: "0px 0px 4px 4px", color: "var(--color-mode)" }}
            >
              <b>{props.contact.followingId.screenName}</b>
            </p>
            <p
              style={{
                margin: "-7px 0px 4px 4px",
                fontSize: "13px",
                color: "var(--color-mode)",
                opacity: "0.8",
              }}
            >
              @{props.contact.followingId.tag}
            </p>

            <h6
              style={{
                margin: "0px 0px 4px 4px",
                fontSize: "13px",
                color: "var(--color-mode)",
              }}
            >
              {props.contact.followingId.Biography}
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
            Unfollow @{props.contact.followingId.tag}?
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
      {props.contact.followingId._id !== userID ? (
        <Button
          onClick={handleButtonClick}
          className={
            props.contact.isfollowing ? "followButton1" : "followButton2"
          }
        >
          {props.contact.isfollowing ? "Following" : "Follow"}
        </Button>
      ) : null}
    </div>
  );
}

export default FollowingCard;
