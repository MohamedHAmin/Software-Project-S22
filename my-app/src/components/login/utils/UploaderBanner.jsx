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
 * @param {props} props Getting the name and photo of the banner.
 * @returns Returns the banner photo uploader.
 */

function UploaderBanner(props) {
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
   
        props.addBaner(convertedUrlToFile)
        console.log("🚀 ~ file: UploaderBanner.jsx ~ line 53 ~ onUpload ~ convertedUrlToFile", convertedUrlToFile)
        
        return
/*     formdata.append("image", convertedUrlToFile);
    axios
      .put(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userID}/banner`, formdata, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(res);

        setPhoto1(res.data.banner.url);

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
      .delete(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userID}/banner`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(res);
        setPhoto1(res.data.banner.url);
        if (res.error) {
          alert("something went wrong");
        }
      })
      .catch((err) => {
        //err.message; // 'Oops!'
        alert(err.response.data.error);
        console.log(err);
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
                aspect={2}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                cropShape="rect"
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
              width: 665,
              height: 220,
            }}
            variant="square"
          >
            {!photo1 ? (
              <div>
                <Avatar
                  className="coverImage"
                  variant="square"
                  sx={{ width: 665, height: 220 }}
                  alt={props.Name}
                  src={props.photo}
                  onClick={() => triggerFileSelectPopup()}
                />
              </div>
            ) : (
              <Avatar
                className="coverImage"
                variant="square"
                sx={{ width: 665, height: 220 }}
                alt={props.Name}
                src={photo1}
                onClick={() => triggerFileSelectPopup()}
              />
            )}
          </IconButton>
          {props.photo ? (
            <DeleteIcon className="DeleteIcon" onClick={onDelete} />
          ) : null}
        </label>
      )}

      <input
        type="file"
        data-testid="image"
        accept="image/*"
        ref={inputRef}
        onChange={onSelectFile}
        style={{ display: "none" }}
      />
    </div>
  );
}
export default UploaderBanner;
