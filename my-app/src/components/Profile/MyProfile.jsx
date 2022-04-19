import React, { useState } from "react";
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
  birthday,
  setName,
  setBio,
  setLocation,
  setWebsite,
  isFollowed,
  isAdmin,
  sameUserProf,
  banDuration,
  setBanDuration,
}) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonclosePopup, setButtonClosePopup] = useState(false);
  const [Name, setName1] = useState(name);
  const [NameError, setNameError] = useState(false);
  const [Bio, setBio1] = useState(bio);
  const [Location, setLocation1] = useState(location);
  const [Website, setWebsite1] = useState(website);
  const [followModalState, setFollowModalState] = useState(false);
  const [IsFollowed, setIsFollowed] = useState(isFollowed);
  const [Followers, setFollowers1] = useState(followers);
  const [optionsModalState, setOptionsModalState] = useState(false);
  const [banDuration1, setBanDuration1] = useState(banDuration);

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

  function handleButtonClick() {
    if (IsFollowed) {
      setFollowModalState(true);
    } else {
      setFollowers(followers + 1);
      setFollowers1(followers + 1);
      setIsFollowed(true);
    }
  }

  function handleUnfollowAction() {
    setFollowers(followers - 1);
    setFollowers1(followers - 1);
    setFollowModalState(false);
    setIsFollowed(false);
  }

  function handleOptionsClick() {
    setOptionsModalState(true);
  }
  function handleBanAction() {
    setBanDuration(banDuration1);
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
  return (
    <div className="myProfile">
      <div className="myProfileName">
        <ProfileName pName={name} tweetNum={tweets} />
      </div>
      <Avatar
        className="coverImage"
        variant="square"
        sx={{ width: "auto", height: 180 }}
        alt={name}
        src={pictureCover}
      />
      <div className="profileSetup">
        <Avatar className="profileImage" alt={name} src={picture} />

        {!sameUserProf ? (
          isAdmin ? (
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
            {picture || bio ? "Edit Profile" : "Set Up Profile"}
          </Button>
        ) : (
          <Button
            className="FollowUnfollowButton"
            onClick={handleButtonClick}
            data-testid="Follow-Profile-Button"
          >
            {IsFollowed ? "Unfollow" : "Follow"}
          </Button>
        )}

        <Modal
          open={optionsModalState}
          onClose={handleCancelAction}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          keepMounted
        >
          {isAdmin ? (
            <FormControl className="editProfileCloseContainer" fullWidth>
              <Typography id="modal-modal-title" variant="h6">
                Ban @{userName}?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 1 }}>
                How long do you want to suspend @{userName}?
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
                  onClick={() => setOptionsModalState(false)}
                  className="profileCloseContainerButton"
                >
                  Cancel
                </Button>
              </div>
            </FormControl>
          ) : (
            <FormControl className="editProfileCloseContainer">
              <Typography id="modal-modal-title" variant="h6">
                Report @{userName}?
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Let the admins know what's wrong with this account. No one else
                will see your name or the content of this report.
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
              Unfollow @{userName}?
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
                inputProps={
                  ({ maxLength: 50 }, { "data-testid": "editProfile-Name" })
                }
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
                inputProps={
                  ({ maxLength: 160 }, { "data-testid": "editProfile-Bio" })
                }
              />
              <TextField
                className="editProfileField"
                label="Location"
                onChange={(e) => setLocation1(e.target.value)}
                defaultValue={location}
                fullWidth
                inputProps={
                  ({ maxLength: 30 }, { "data-testid": "editProfile-Location" })
                }
              />
              <TextField
                className="editProfileField"
                label="Website"
                onChange={(e) => setWebsite1(e.target.value)}
                defaultValue={website}
                fullWidth
                inputProps={
                  ({ maxLength: 100 }, { "data-testid": "editProfile-Website" })
                }
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
        birthday={birthday}
      />
      <MyProfileTabs />
    </div>
  );
}

export default MyProfile;
