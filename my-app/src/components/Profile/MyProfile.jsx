import React, { useState } from "react";
import "./Styles/MyProfile.css";
import ProfileName from "./ProfileName";
import Avatar from "@mui/material/Avatar";
import ProfileInfo from "./ProfileInfo";
import { Button, Typography, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import MyProfileTabs from "./MyProfileTabs";

function MyProfile({
  name,
  tweets,
  userName,
  date,
  followers,
  following,
  setFollowers,
  picture,
  pictureCover,
  bio,
  location,
  website,
  setName,
  setBio,
  setLocation,
  setWebsite,
  isFollowed,
}) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonclosePopup, setButtonClosePopup] = useState(false);
  const [Name, setName1] = useState(name);
  const [NameError, setNameError] = useState(false);
  const [Bio, setBio1] = useState(bio);
  const [Location, setLocation1] = useState(location);
  const [Website, setWebsite1] = useState(website);
  const [modalState, setModalState] = useState(false);
  const [IsFollowed, setIsFollowed] = useState(isFollowed);
  const [Followers, setFollowers1] = useState(followers);
  const [sameUserProf, setSameUserProf] = useState(false);


  function saveBtn(e) {
    e.preventDefault();
    setNameError(false);
    if (Name === "") {
      setNameError(true);
    } else {
      setName(Name);
    }

    setBio(Bio);
    setLocation(Location);
    setWebsite(Website);
    if (Name !== "") setButtonPopup(false);
  }

  function closeBtn() {
    if (
      Name === name &&
      Bio === bio &&
      Location === location &&
      Website === website
    )
      setButtonPopup(false);
    else setButtonClosePopup(true);
  }

  function handleButtonClick(){
    if(IsFollowed)
    {
      setModalState(true);
    }
    else{
      setFollowers(followers+1)
      setFollowers1(followers+1)
      setIsFollowed(true);
    }
  }

  function handleUnfollowAction(){

    setFollowers(followers-1)
    setFollowers1(followers-1)
    setModalState(false);
    setIsFollowed(false);

  }

  function handleCancelAction(){
    setModalState(false);
  }

  return (
    <div className="myProfile">
      <ProfileName pName={name} tweetNum={tweets} />
      <Avatar
        variant="square"
        sx={{ width: "auto", height: 180 }}
        alt={name}
        src={pictureCover}
      />
      <div className="profileSetup">
        <Avatar className="profileImage" alt={name} src={picture} />
        {sameUserProf ?         
        <Button
          className="setupProfileButton"
          onClick={() => setButtonPopup(true)}
          variant="outlined"
          fullWidth
        >
          {picture || bio ? "Edit Profile" : "Set Up Profile"}
        </Button> :
        <Button
        className="setupProfileButton"
        id="btn1"
        onClick={handleButtonClick}
        >
        {IsFollowed ? "Unfollow" : "Follow"}
        </Button>
       }

  <Modal 
  open={modalState}
  onClose={handleCancelAction}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
  keepMounted
  >
    <form 
    className="editProfileCloseContainer" 
    >
      <Typography id="modal-modal-title" variant="h6" >
        Unfollow @{userName}?
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Their Tweets will no longer show up in your home timeline. You can still view their profile, unless their Tweets are protected.
      </Typography>
      <div style={{textAlign:"center"}}>
        <Button 
        onClick={handleUnfollowAction}
        className="profileDiscardContainerButton"
        >
        Unfollow
        </Button>
      </div>
      <div style={{ textAlign:"center"}}>
        <Button
        onClick={handleCancelAction}
        className="profileCloseContainerButton"
        >
        Cancel
        </Button>
      </div>
    </form>
  </Modal>



        <Modal
          open={buttonPopup}
          onClose={buttonPopup}
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
                defaultValue={name}
                required
                fullWidth
                inputProps={{ maxLength: 50 }}
                error={NameError}
              />
              <TextField
                className="editProfileField"
                label="Bio"
                onChange={(e) => setBio1(e.target.value)}
                defaultValue={bio}
                fullWidth
                multiline
                rows={3}
                inputProps={{ maxLength: 160 }}
              />
              <TextField
                className="editProfileField"
                label="Location"
                onChange={(e) => setLocation1(e.target.value)}
                defaultValue={location}
                fullWidth
                inputProps={{ maxLength: 30 }}
              />
              <TextField
                className="editProfileField"
                label="Website"
                onChange={(e) => setWebsite1(e.target.value)}
                defaultValue={website}
                fullWidth
                inputProps={{ maxLength: 100 }}
              />
            </div>
            <Modal
              open={buttonclosePopup}
              onClose={false}
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
        name={name}
        userName={userName}
        date={date}
        followers={Followers}
        following={following}
        bio={bio}
        location={location}
        website={website}
      />
      <MyProfileTabs />
    </div>
  );
}

export default MyProfile;
