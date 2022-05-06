import React, { useEffect, useState } from "react";
import "./Styles/MyProfile.css";
import ProfileName from "./ProfileName";
import Avatar from "@mui/material/Avatar";
import ProfileInfo from "./ProfileInfo";
import EditProfile from "./EditProfile";
import { Button, Typography, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import MyProfileTabs from "./MyProfileTabs";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Post from "../Homepage/Post";
import { FallingLines } from "react-loader-spinner";
import { Web } from "@material-ui/icons";
/**
 *
 * @param {props} props Getting if it's admin
 * @returns Returns the main section of the profile page.
 */
function MyProfile(props) {
  const navigate = useNavigate();
  let { id } = useParams();
  const [isFollowed, setIsFollowed] = useState(false);
  const [sameUserProf, setSameUserProf] = useState(false);
  let userID = localStorage.getItem("userId");
  let isAdmin = localStorage.getItem("adminToken");
  const [joinedDate, setJoinedDate] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [followModalState, setFollowModalState] = useState(false);
  const [optionsModalState, setOptionsModalState] = useState(false);
  const [userTweets, setUserTweets] = useState([]);
  const [coverImage, setCoverImage] = useState("");
  const [Tag, setTag] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [Following, setFollowing] = useState(0);
  const [birthDate, setBirthDate] = useState("");
  const [birthDateVisability, setbirthDateVisability] = useState(true);
  const [Name, setName] = useState("");
  const [Bio, setBio] = useState("");
  const [Location, setLocation] = useState("");
  const [Website, setWebsite] = useState("");
  const [locationVisability, setlocationVisability] = useState(true);

  const [Followers, setFollowers] = useState(0);

  const [banDuration, setBanDuration] = useState("");
  const [banDuration1, setBanDuration1] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/tweet/user/${id}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Error");
        } else {
          setUserTweets(res.data);
        }
      });
    if (id == userID) {
      setSameUserProf(true);
    }

    if (sameUserProf) {
      setName(null);
      axios
        .get(`http://localhost:4000/profile/${id}/me`, {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
        .then((res) => {
          console.log(res);
          if (res.error) {
            console.log("Error");
          } else {
            props.setDarkMode(res.data.darkMode);
            setName(res.data.screenName);
            setBio(res.data.Biography);
            setLocation(res.data.location.place);
            setWebsite(res.data.website);
            setlocationVisability(res.data.location.visability);
            setJoinedDate(res.data.createdAt);
            setFollowers(res.data.followercount);
            setCoverImage(res.data.banner.url);
            setTag(res.data.tag);
            setBanDuration(res.data.ban);
            setProfilePhoto(res.data.profileAvater.url);
            setFollowing(res.data.followingcount);
            setBirthDate(res.data.birth.date);
            setbirthDateVisability(res.data.birth.visability);
          }
        });
    } else {
      setName(null);
      axios
        .get(`http://localhost:4000/profile/${id}`, {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
        .then((res) => {
          console.log(res);
          if (res.error) {
            console.log("Error");
          } else {
            setName(res.data.user.screenName);
            setBio(res.data.user.Biography);
            setWebsite(res.data.user.website);
            setLocation(res.data.user.location.place);
            setlocationVisability(res.data.user.location.visability);
            setJoinedDate(res.data.user.createdAt);
            setFollowers(res.data.user.followercount);
            setCoverImage(res.data.user.banner.url);
            setTag(res.data.user.tag);
            setBanDuration(res.data.user.ban);
            setProfilePhoto(res.data.user.profileAvater.url);
            setFollowing(res.data.user.followingcount);
            setBirthDate(res.data.user.birth.date);
            setbirthDateVisability(res.data.user.birth.visability);
            setIsFollowed(res.data.isfollowing);
          }
        });
    }
  }, [id]);

  const passdeletedTweet = (id) => {
    axios
      .delete(`http://localhost:4000/tweet/${id}`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(res);
        if (res.error || !res.data === "success") {
          alert("something went wrong");
        } else {
          window.location.reload();
          axios
            .get(`http://localhost:4000/tweet/user/${id}`, {
              headers: { Authorization: localStorage.getItem("accessToken") },
            })
            .then((res) => {
              console.log(res);
              if (res.error) {
                console.log("Error");
              } else {
                setUserTweets(res.data);
                window.location.reload();
                window.location.reload();
              }
            });
        }
        //retweetCount();
      })
      .catch((err) => {
        //err.message; // 'Oops!'
        alert("Error occured while deleting");
        console.log(err);
      });
  };
  /**
   * Handling the following request
   */
  function handleButtonClick() {
    console.log(isFollowed);
    if (isFollowed) {
      setFollowModalState(true);
    } else {
      axios
        .post(`http://localhost:4000/${userID}/follow/${id}`, null, {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
        .then((res) => {
          setFollowers(Followers + 1);

          setIsFollowed(true);
          console.log(res);
        })
        .catch((err) => {
          debugger;
          alert(err.response.data.error);
          setFollowModalState(true); // 'Oops!'
        });
    }
  }
  /**
   * Handling the unfollowing request
   */
  function handleUnfollowAction() {
    axios
      .post(`http://localhost:4000/${userID}/unfollow/${id}`, null, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(res);
        setFollowers(Followers - 1);
        setFollowModalState(false);
        setIsFollowed(false);
      })
      .catch((err) => {
        debugger;
        alert("already unfollowed");
      }); // 'Oops!';
  }
  /**
   * Handling the report navigation
   */
  function handleOptionsClick() {
    if (!isAdmin) {
      navigate(`/Report/Profile/${userID}`);
    } else {
      setOptionsModalState(true);
    }
  }
  /**
   * Handling the ban request
   */
  function handleBanAction() {
    axios
      .post(
        `http://localhost:4000/admin/ban/${id}`,
        { duration: banDuration1 },
        { headers: { Authorization: localStorage.getItem("adminToken") } }
      )
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log(
            "An error occured while attempting to ban the user, please try again"
          );
        } else {
          setBanDuration(banDuration1);
          alert("The user has been banned");
        }
      });
    setOptionsModalState(false);
  }
  function handleSelectChange(event) {
    setBanDuration1(event.target.value);
  }
  function handleReportAction() {
    setOptionsModalState(false);
  }
  function handleCancelAction() {
    setFollowModalState(false);
  }

  if (Name) {
    return (
      <div className="myProfile">
        <div className="myProfileName">
          <ProfileName pName={Name} pID={Tag} />
        </div>
        <Avatar
          onClick={
            coverImage
              ? () => {
                  window.location = coverImage;
                }
              : null
          }
          className="coverImage"
          variant="square"
          sx={{ width: "auto", height: 220 }}
          alt={Name}
          src={coverImage}
        />
        <div className="profileSetup">
          <Avatar
            onClick={
              profilePhoto
                ? () => {
                    window.location = profilePhoto;
                  }
                : null
            }
            className="profileImage"
            alt={Name}
            src={profilePhoto}
          />

          {!sameUserProf ? (
            isAdmin != "" ? (
              <Button
                className="optionProfileButton"
                variant="outlined"
                onClick={handleOptionsClick}
                fullWidth
              >
                Ban
              </Button>
            ) : (
              <Button
                className="optionProfileButton"
                variant="outlined"
                onClick={handleOptionsClick}
                fullWidth
              >
                Report
              </Button>
            )
          ) : null}

          {sameUserProf ? (
            <Button
              className="setupProfileButton"
              onClick={() => setButtonPopup(true)}
              variant="outlined"
              fullWidth
              data-testid="Edit-Profile-Button"
            >
              {profilePhoto || Bio ? "Edit Profile" : "Set Up Profile"}
            </Button>
          ) : (
            <Button
              className="FollowUnfollowButton"
              onClick={handleButtonClick}
              data-testid="Follow-Profile-Button"
            >
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          )}

          <Modal
            open={optionsModalState}
            onClose={handleCancelAction}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            keepMounted
          >
            {isAdmin != "" ? (
              <FormControl className="editProfileCloseContainer">
                <Typography id="modal-modal-title" variant="h6">
                  Ban @{Tag}?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                  How long do you want to suspend @{Tag}?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mb: 1 }}>
                  They won't be able to tweet, comment, or take other actions in
                  the chosen time frame.
                </Typography>
                <Select
                  value={banDuration1}
                  onChange={handleSelectChange}
                  autoWidth
                >
                  <MenuItem value={1}>Day</MenuItem>
                  <MenuItem value={3}>3 Days</MenuItem>
                  <MenuItem value={7}>7 Days</MenuItem>
                  <MenuItem value={14}>14 Days</MenuItem>
                  <MenuItem value={28}>28 Days</MenuItem>
                </Select>
                <div style={{ textAlign: "center" }}>
                  <Button
                    onClick={handleBanAction}
                    className="profileDiscardContainerButton"
                  >
                    Ban
                  </Button>
                  <Button
                    onClick={() => {
                      setOptionsModalState(false);
                      setBanDuration(banDuration);
                    }}
                    className="profileCloseContainerButton"
                  >
                    Cancel
                  </Button>
                </div>
              </FormControl>
            ) : (
              <FormControl className="editProfileCloseContainer">
                <Typography id="modal-modal-title" variant="h6">
                  Report @{Tag}?
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Let the admins know what's wrong with this account. No one
                  else will see your name or the content of this report.
                </Typography>

                <div style={{ textAlign: "center" }}>
                  <Button
                    onClick={handleReportAction}
                    className="profileDiscardContainerButton"
                  >
                    Report
                  </Button>
                  <Button
                    onClick={() => setOptionsModalState(false)}
                    className="profileCloseContainerButton"
                  >
                    Cancel
                  </Button>
                </div>
              </FormControl>
            )}
          </Modal>

          <Modal
            open={followModalState}
            onClose={handleCancelAction}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            keepMounted
          >
            <FormControl className="editProfileCloseContainer">
              <Typography id="modal-modal-title" variant="h6">
                Unfollow @{Tag}?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Their Tweets will no longer show up in your home timeline. You
                can still view their profile, unless their Tweets are protected.
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

          <EditProfile
            buttonPopup={buttonPopup}
            setButtonPopup={() => setButtonPopup(true)}
            closeButtonPopup={() => setButtonPopup(false)}
            Name={Name}
            Bio={Bio}
            Location={Location}
            Website={Website}
            profilePhoto={profilePhoto}
            coverPhoto={coverImage}
          />
        </div>
        <ProfileInfo
          name={Name}
          userName={Tag}
          date={joinedDate}
          followers={Followers}
          following={Following}
          bio={Bio}
          location={Location}
          locationVisability={locationVisability}
          website={Website}
          birthday={birthDate}
          birthdayVisability={birthDateVisability}
        />
        {/* <MyProfileTabs /> */}
        {userTweets?.length ? (
          userTweets.map((post) => (
            <Post
              post={post}
              passdeletedTweet={passdeletedTweet}
              isAdmin={props.isAdmin}
              isPost={true}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    return (
      <div className="Loader">
        <FallingLines height={120} width={150} color="var(--color-mode)" />
      </div>
    );
  }
}
export default MyProfile;
