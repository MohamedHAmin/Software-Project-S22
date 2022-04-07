import React, { useState } from "react";
import "./Styles/MyProfile.css";
import ProfileName from "./ProfileName";
import Avatar from "@mui/material/Avatar";
import ProfileInfo from "./ProfileInfo";
import { Button, Typography, Modal, Box } from "@mui/material";
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
  picture,
  pictureCover,
  bio,
  location,
  website,
  setName,
  setBio,
  setLocation,
  setWebsite,
}) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonclosePopup, setButtonClosePopup] = useState(false);
  const [Name, setName1] = useState(name);
  const [NameError, setNameError] = useState(false);
  const [Bio, setBio1] = useState(bio);
  const [Location, setLocation1] = useState(location);
  const [Website, setWebsite1] = useState(website);
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
    <Modal
      open={buttonclosePopup}
      onClose={buttonclosePopup}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="editProfileModal"
    >
      <Box className="editProfileCloseContainer">
        <Typography>Hello</Typography>
      </Box>
    </Modal>;
    setButtonPopup(false);
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

        <Button
          className="setupProfileButton"
          onClick={() => setButtonPopup(true)}
          variant="outlined"
          fullWidth
        >
          {picture || bio ? "Edit Profile" : "Set Up Profile"}
        </Button>

        <Modal
          open={buttonPopup}
          onClose={buttonPopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="editProfileModal"
        >
          <form
            className="editProfileContainer"
            noValidate
            autoComplete="off"
            onSubmit={saveBtn}
          >
            <div className="editProfileHeader">
              <div className="closeIcon" onClick={closeBtn}>
                <CloseIcon />
              </div>

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
                inputProps={{ maxLength: 50 }}
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
                inputProps={{ maxLength: 160 }}
              />
              <TextField
                className="editProfileField"
                label="Location"
                onChange={(e) => setLocation1(e.target.value)}
                defaultValue={Location}
                fullWidth
                inputProps={{ maxLength: 30 }}
              />
              <TextField
                className="editProfileField"
                label="Website"
                onChange={(e) => setWebsite1(e.target.value)}
                defaultValue={Website}
                fullWidth
                inputProps={{ maxLength: 100 }}
              />
            </div>
          </form>
        </Modal>
      </div>
      <ProfileInfo
        name={name}
        userName={userName}
        date={date}
        followers={followers}
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
