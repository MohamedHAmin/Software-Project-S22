import React ,{ useState } from "react";
import "./Styles/TweetBar.css";
import GifBoxIcon from '@mui/icons-material/GifBox';
import PollIcon from '@mui/icons-material/Poll';
import MoodIcon from '@mui/icons-material/Mood';
import EventNoteIcon from '@mui/icons-material/EventNote';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import {Button} from '@mui/material';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
const Input = styled('input')({
    display: 'none',
});

function TweetBar(props){
    //const [selectedImage, setSelectedImage] = useState(null);
    /*const [uploadCount,setuploadCount]=useState(0);
    console.log(uploadCount);*/
    return(
       
    <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
        <label  htmlFor="icon-button-file">
        <Input  accept="image/*" id="icon-button-file" type="file" name="myImage"
         onChange={(event) => {
          console.log(event.target.files[0]);
          props.onimgChange(event.target.files[0]);
          /*var temp2=uploadCount;
          temp2++;
          setuploadCount(temp2);*/
        }} />
        <IconButton style ={{color:"#2b3dbc"}} aria-label="upload picture" component="span">
        <PhotoCamera  />
        </IconButton>
        </label>

        <label htmlFor="icon-button">
        <Input accept="image/*" id="icon-button-file" type="button" />
        <IconButton style ={{color:"#2b3dbc"}} aria-label="upload picture" component="span">
        <GifBoxIcon />
        </IconButton>
        </label>

        <label className="Icon-control" htmlFor="icon-button">
        <Input accept="image/*" id="icon-button-file" type="button" />
        <IconButton style ={{color:"#2b3dbc"}} aria-label="upload picture" component="span">
        <PollIcon/>
        </IconButton>
        </label>

        <label htmlFor="icon-button">
        <Input accept="image/*" id="icon-button-file" type="button" />
        <IconButton style ={{color:"#2b3dbc"}} aria-label="upload picture" component="span">
        <MoodIcon />
        </IconButton>
        </label>

        <label className="Icon-control" htmlFor="icon-button">
        <Input accept="image/*" id="icon-button-file" type="date" />
        <IconButton style ={{color:"#2b3dbc"}} aria-label="upload picture" component="span">
        <EventNoteIcon />
        </IconButton>
        </label>

        <label htmlFor="icon-button">
        <Input accept="image/*" id="icon-button-file" type="button" />
        <IconButton style ={{color:"#2b3dbc"}} aria-label="upload picture" component="span">
        <AddLocationAltIcon />
        </IconButton>
        </label>

        <Button onClick={props.postHandeler} style={{fontSize:20}} className="sidexarTweet" variant="contained">
          LAR
        </Button>
    </div>
);    
}
export default TweetBar