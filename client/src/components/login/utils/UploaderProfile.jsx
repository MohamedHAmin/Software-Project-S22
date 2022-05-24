import React, { useState } from "react";
import "../Styles/ImageUploader.css";
import getCroppedImg from "../../Profile/cropImage";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { dataURLtoFile } from "../../Profile/dataURLtoFile";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

/**
 *
 * @param {props} props Getting the name and photo of the profile.
 * @returns Returns the profile photo uploader.
 */
function ImageUploaderProfile(props) {
  const inputRef = React.useRef();

  const triggerFileSelectPopup = () => inputRef.current.click();
  let userID = localStorage.getItem("userId");
  const [image, setImage] = React.useState(null);
  const [croppedArea, setCroppedArea] = React.useState(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const formdata = new FormData();
  const [photo1, setPhoto1] = useState(null);
  const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImage(reader.result);
      });
    }
  };

  async function onUpload() {
    const canvas = await getCroppedImg(image, croppedArea);
    const canvasDataUrl = canvas.toDataURL("image/jpeg", 1);
    const convertedUrlToFile = dataURLtoFile(
      canvasDataUrl,
      "cropped-image.jpeg"
    );
 props.addAvatar(convertedUrlToFile)
    /* formdata.append("image", convertedUrlToFile);
    axios
      .put(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userID}/avater`, formdata, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(res);

        setPhoto1(res.data.profileAvater.url);

        if (res.error) {
          alert("something went wrong");
        }
      })
      .catch((err) => {
        //err.message; // 'Oops!'
        alert(err.response.data.error);
        console.log(err);
      });
    setImage(null); */
  }
  async function onDelete() {
    await axios
      .delete(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userID}/avater`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(res);
        setPhoto1(res.data.profileAvater.url);
        if (res.error) {
          alert("something went wrong");
        }
      })
      .catch((err) => {
        console.log("🚀 ~ file: UploaderProfile.jsx ~ line 85 ~ onDelete ~ err", err)
        //err.message; // 'Oops!'
        alert(err.response.data.error);
      });
  }

  return (
    <div>
      {image ? (
        <div className="container">
          <div className="container-cropper">
            <div className="cropper">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="round"
              />
            </div>
            <div className="cont">
              <div className="slider">
                <Slider
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e, zoom) => setZoom(zoom)}
                />
              </div>

              <Button
                className="container-buttons"
                variant="outlined"
                onClick={onUpload}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <label htmlFor="icon-button-file1">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            sx={{
              width: 148,
              height: 148,
              mt: -9,
              ml: 2,
              border: 4,
              borderColor: "white",
            }}
            variant="round"
          >
            {!photo1 ? (
              <Avatar
                className="coverImage"
                variant="round"
                sx={{
                  width: 140,
                  height: 140,
                  borderRadius: 30,
                }}
                alt={props.Name}
                src={props.photo}
                onClick={() => triggerFileSelectPopup()}
              />
            ) : (
              <Avatar
                className="coverImage"
                variant="round"
                sx={{
                  width: 140,
                  height: 140,
                  borderRadius: 30,
                }}
                alt={props.Name}
                src={photo1}
                onClick={() => triggerFileSelectPopup()}
              />
            )}
          </IconButton>
          {props.photo ? (
            <DeleteIcon className="DeleteIconProfile" onClick={onDelete} />
          ) : null}
        </label>
      )}

      <input
        type="file"
        data-testid="profile"
        accept="image/*"
        ref={inputRef}
        onChange={onSelectFile}
        style={{ display: "none" }}
      />
    </div>
  );
}

export default ImageUploaderProfile;
