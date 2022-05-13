import { React, useState } from "react";
import "./Styles/MyProfile.css";
import { Button, Typography, Modal } from "@mui/material";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import ImageUploaderBanner from "./ImageUploaderBanner";
import ImageUploaderProfile from "./ImageUploaderProfile";
import axios from "axios";

/**
 *
 * @param {props} props Getting some information about the user.
 * @returns Returns the edit profile pop up.
 */

function EditProfile(props) {
  let userID = localStorage.getItem("userId");
  const [buttonclosePopup, setButtonClosePopup] = useState(false);
  const [NameError, setNameError] = useState(false);
  /**
   *
   * @param {event} event The event of handling the edit profile button.
   */
  function saveBtn(e) {
    e.preventDefault();

    let data = {
      screenName: document.getElementById("editNameProfileField").value,
      Biography: document.getElementById("editBioProfileField").value,
      website: document.getElementById("editWebsiteProfileField").value,
    };
    setNameError(false);
    if (!document.getElementById("editNameProfileField").value) {
      setNameError(true);
    } else {
      console.log("---------------------------");
      console.log(data);
      console.log("---------------------------");
      axios
        .put(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userID}`, data, {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
        .then((res) => {
          console.log(res);
          if (res.error) {
            alert("Something wrong happened!");
          } else {
            axios
              .put(
                `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userID}`,
                {
                  location: {
                    place: document.getElementById("editLocationProfileField")
                      .value,
                  },
                },
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
                  window.location.reload();
                }
              });
          }
        });
    }

    if (document.getElementById("editNameProfileField").value)
      props.closeButtonPopup();
  }

  function handleDiscard() {
    document.getElementById("editNameProfileField").value = props.Name;
    document.getElementById("editBioProfileField").value = props.Bio;
    document.getElementById("editLocationProfileField").value = props.Location;
    document.getElementById("editWebsiteProfileField").value = props.Website;
  }
  function closeBtn() {
    if (
      props.Name === document.getElementById("editNameProfileField").value &&
      props.Bio === document.getElementById("editBioProfileField").value &&
      props.Location ===
        document.getElementById("editLocationProfileField").value &&
      props.Website === document.getElementById("editWebsiteProfileField").value
    )
      props.closeButtonPopup();
    else {
      setButtonClosePopup(true);
    }
  }

  return (
    <Modal
      open={props.buttonPopup}
      onClose={() => props.closeButtonPopup()}
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
          <div className="closeIcon">
            <CloseIcon onClick={closeBtn} />
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

        <ImageUploaderBanner Name={props.Name} photo={props.coverPhoto} />
        <ImageUploaderProfile Name={props.Name} photo={props.profilePhoto} />

        <div className="editProfileInputs">
          <TextField
            className="editProfileField"
            label="Name"
            id="editNameProfileField"
            defaultValue={props.Name}
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
            id="editBioProfileField"
            defaultValue={props.Bio}
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
            id="editLocationProfileField"
            defaultValue={props.Location}
            fullWidth
            multiline
            rows={1}
            inputProps={
              ({ maxLength: 160 }, { "data-testid": "editProfile-Location" })
            }
          />
          <TextField
            className="editProfileField"
            label="Website"
            id="editWebsiteProfileField"
            defaultValue={props.Website}
            fullWidth
            multiline
            rows={1}
            inputProps={
              ({ maxLength: 100 }, { "data-testid": "editProfile-Website" })
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
                props.closeButtonPopup();
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
  );
}

export default EditProfile;
