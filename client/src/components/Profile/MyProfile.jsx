import React, { useEffect, useState } from "react";
import "./Styles/MyProfile.css";
import ProfileName from "./ProfileName";
import Avatar from "@mui/material/Avatar";
import ProfileInfo from "./ProfileInfo";
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

//TO DO (hopefully dah ma3 yosef law fady ya3ny w trage3 3al code elly ana 3amlo.. ana kont bazabbat feeh ma3 kimo ya3ny bas yosef ye3raf aktar akid)
//e3mel isAdmin (lazem 3ashan el report wel ban yetzabbato)
//line 77 zabbat request el edit profile feeh ba3d ma tkallem 7ad backend
//e3mel parse lel data createdAt 3ashan beteegy shabah keda: ISODate("2022-04-21T10:34:37.095Z") => enta 3awezha keda: April 2022
//e3mel map lel tweets hena... leeha route men el backend w mary betzabbatha fel homepage w hatsa3dak isA

function MyProfile(props) {
  const [profileData, setProfileData] = useState([]);
  let { id } = useParams();
  const [isFollowed, setIsFollowed] = useState(false);
  const [sameUserProf, setSameUserProf] = useState(false);
  //var sameUserProf;
  let userID = localStorage.getItem("userId");
  let isAdmin = localStorage.getItem("adminToken");

  const [joinedDate, setJoinedDate] = useState("");
  const navigate = useNavigate();
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonclosePopup, setButtonClosePopup] = useState(false);
  const [NameError, setNameError] = useState(false);
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
  const [locationVisability, setlocationVisability] = useState(true);

  const [Website, setWebsite] = useState("");
  const [Name1, setName1] = useState(Name);
  const [Bio1, setBio1] = useState(Bio);
  const [Location1, setLocation1] = useState(Location);
  const [Website1, setWebsite1] = useState(Website);
  const [Followers, setFollowers] = useState(0);

  const [banDuration, setBanDuration] = useState("");
  const [banDuration1, setBanDuration1] = useState("");
  // function fetchData() {
  //   setName(profileData.screenName);
  //   setBio(profileData.Biography);
  //   setLocation(profileData.location.place);
  //   setJoinedDate(profileData.createdAt);
  //   setFollowers(profileData.followercount);
  //   setCoverImage(profileData.banner.url);
  //   setTag(profileData.tag);
  //   setBanDuration(profileData.ban);
  //   setProfilePhoto(profileData.profileAvater.url);
  //   setFollowing(profileData.followingcount);
  //   setBirthDate(profileData.birth.date.Date);
  // }

  useEffect(() => {
    axios
      .get(
        `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/tweet/user/${id}`,
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      )
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
    console.log(sameUserProf);
    if (id === userID) {
      axios
        .get(
          `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/profile/${id}/me`,
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          console.log(res);
          if (res.error) {
            console.log("Error");
          } else {
            setProfileData(res.data);
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
      axios
        .get(
          `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/profile/${id}`,
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          console.log(res);
          if (res.error) {
            console.log("Error");
          } else {
            setProfileData(res.data);
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

    // let obj = profileData.following.find((o) => o.id === id);
    // if (obj) {
    //   setIsFollowed(true);
    // }

    // axios
    //   .get(
    //     `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/tweet/user/${id}/me`,
    //     { headers: { Authorization: localStorage.getItem("accessToken") } }
    //   )
    //   .then((res) => {
    //     setUserTweets(res.data);
    //   });
  }, [id]);

  const passdeletedTweet = (id) => {
    axios
      .delete(
        `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/tweet/${id}`,
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        console.log(res);
        if (res.error || !res.data === "success") {
          alert("something went wrong");
        } else {
          window.location.reload();
          axios
            .get(
              `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/tweet/user/${id}`,
              {
                headers: { Authorization: localStorage.getItem("accessToken") },
              }
            )
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

  function saveBtn(e) {
    e.preventDefault();
    let data = {
      screenName: Name1,
      Biography: Bio1,
      website: Website1,
    };
    console.log(Name1);
    setNameError(false);
    if (Name1 === "") {
      setNameError(true);
    } else {
      // setName(Name1);
      // setBio(Bio1);
      // setLocation(Location1);
      console.log("---------------------------");
      console.log(data);
      console.log("---------------------------");
      axios
        .put(
          `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/profile/${userID}`,
          data,
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          console.log(res);
          if (res.error) {
            alert("Something wrong happened!");
          } else {
            axios
              .put(
                `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/profile/${userID}`,
                { location: { place: Location1 } },
                {
                  headers: {
                    Authorization: localStorage.getItem("accessToken"),
                  },
                }
              )
              .then((res) => {
                console.log(res);
                if (res.error) {
                  alert("Something wrong happened!");
                } else {
                  setName(Name1);
                  setBio(Bio1);
                  setWebsite(Website1);
                  setLocation(Location1);
                  window.location.reload();
                }
              });
          }
        });
    }
    //setWebsite(Website);
    if (Name1 !== "") setButtonPopup(false);
  }

  function handleDiscard() {
    setName(Name);
    setBio(Bio);
    setWebsite(Website);
    setLocation(Location);
  }
  function closeBtn() {
    if (
      Name === Name1 &&
      Bio === Bio1 &&
      Location === Location1 &&
      Website === Website1
      // &&Website === website
    )
      setButtonPopup(false);
    else {
      setButtonClosePopup(true);
      // setName(profileData.screenName);
      // setBio(profileData.biography);
      // setLocation(profileData.location);
    }
  }

  function handleButtonClick() {
    console.log(isFollowed);
    if (isFollowed) {
      setFollowModalState(true);
    } else {
      axios
        .post(
          `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/user/${userID}/follow/${id}`,
          null,
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          setFollowers(Followers + 1);
          //profileData.followercount=Followers+1
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
  //console.log(isFollowed);
  //console.log(userID);
  //console.log(id);
  function handleUnfollowAction() {
    axios
      .post(
        `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/user/${userID}/unfollow/${id}`,
        null,
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      )
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

  function handleOptionsClick() {
    if(!isAdmin)
    {
      navigate(`/Report/Profile/${userID}`);
    }
    else
    {
      setOptionsModalState(true);
    }
  }
  function handleBanAction() {
    axios
      .post(
        `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/admin/ban/${id}`,
        {duration:banDuration1},
        {headers: {Authorization: localStorage.getItem("adminToken")}}
      )
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log(
            "An error occured while attempting to ban the user, please try again"
          );
        }
        else
        {
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
  // function toMonthName() {
  //   const date = new Date();
  //   date.setMonth(joinedDate.getMonth() - 1);
  //   console.log(joinedDate);
  //   return date.toLocaleString("en-US", {
  //     month: "long",
  //   });
  // }
  // console.log(userID);
  // console.log(id);
  // console.log(profileData);
  // //console.log(sameUserProf);
  // console.log(Name);
  if (Name) {
    return (
      <div className="myProfile">
        <div className="myProfileName">
          <ProfileName pName={Name} pID={Tag} />
        </div>
        <Avatar
          className="coverImage"
          variant="square"
          sx={{ width: "auto", height: 180 }}
          alt={Name}
          src={coverImage}
        />
        <div className="profileSetup">
          <Avatar className="profileImage" alt={Name} src={profilePhoto} />

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

          <Modal
            open={buttonPopup}
            onClose={() => setButtonPopup(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="editProfileModal"
            keepMounted
          >
            <form
              className="editProfileContainer"
              noValidate
              autoComplete="off"
              onSubmit={saveBtn}
            >
              <div className="editProfileHeader">
                <CloseIcon className="closeIcon" onClick={closeBtn} />
                <Typography variant="h6" color="black">
                  Edit Profile
                </Typography>
                <Button
                  className="saveProfileButton"
                  type="submit"
                  variant="outlined"
                  fullWidth
                >
                  Save
                </Button>
              </div>
              <div className="editProfileInputs">
                <TextField
                  className="editProfileField"
                  label="Name"
                  onChange={(e) => setName1(e.target.value)}
                  defaultValue={Name}
                  required
                  fullWidth
                  inputProps={
                    ({ maxLength: 50 }, { "data-testid": "editProfile-Name" })
                  }
                  error={NameError}
                />
                <TextField
                  className="editProfileField"
                  label="Bio"
                  onChange={(e) => setBio1(e.target.value)}
                  defaultValue={Bio}
                  fullWidth
                  multiline
                  rows={3}
                  inputProps={
                    ({ maxLength: 160 }, { "data-testid": "editProfile-Bio" })
                  }
                />
                <TextField
                  className="editProfileField"
                  label="Location"
                  onChange={(e) => setLocation1(e.target.value)}
                  defaultValue={Location}
                  fullWidth
                  inputProps={
                    ({ maxLength: 30 },
                    { "data-testid": "editProfile-Location" })
                  }
                />
                <TextField
                  className="editProfileField"
                  label="Website"
                  onChange={(e) => setWebsite1(e.target.value)}
                  defaultValue={Website}
                  fullWidth
                  inputProps={
                    ({ maxLength: 100 },
                    { "data-testid": "editProfile-Website" })
                  }
                />
              </div>
              <Modal
                open={buttonclosePopup}
                onClose={() => setButtonClosePopup}
                className="closeEditProfileModal"
              >
                <form
                  className="editProfileCloseContainer"
                  noValidate
                  autoComplete="off"
                >
                  <Typography
                    variant="h6"
                    color="black"
                    fontSize={18}
                    fontWeight={600}
                  >
                    Discard Changes?
                  </Typography>
                  <Typography
                    variant="p"
                    color="black"
                    fontSize={15}
                    fontWeight={400}
                  >
                    This can't be undone and you 'll lose your changes.
                  </Typography>
                  <Button
                    className="profileDiscardContainerButton"
                    onClick={() => {
                      setButtonClosePopup(false);
                      setButtonPopup(false);
                      handleDiscard();
                    }}
                  >
                    Discard
                  </Button>
                  <Button
                    className="profileCloseContainerButton"
                    onClick={() => setButtonClosePopup(false)}
                  >
                    Cancel
                  </Button>
                </form>
              </Modal>
            </form>
          </Modal>
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
        <MyProfileTabs />
        {userTweets?.length ? (
          userTweets.map((post) => (
            <Post
              post={post}
              passdeletedTweet={passdeletedTweet}
              isAdmin={props.isAdmin}
              isPost={true}
              //path={`/Profile/${userID}`}
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
