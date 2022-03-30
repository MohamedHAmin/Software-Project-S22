import React,{useState} from "react";
import Emoji from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import InputAdornment from "@material-ui/core/InputAdornment";
import "./Styles/Comment.css"
import { TextField } from "@mui/material";
import "./Emoji.jsx";
import Tweet from './Tweet';

function Comment(){
    //state = {  } 
    /*onEmojiClick=()=>
    {
        <Emojis/>
    }*/
    const [content,setcontent]=useState("");
    
    function enterHandler (event)
    {
        if (event.keyCode == 13) {
            if (content!="")
            {
                <Tweet content={content}/>;
                setcontent("");
            }
        }
    };


        return (
            <React.Fragment>
                <span id="1" className="comment" onKeyUp={enterHandler}>
                    <TextField value={content} variant="standard" className="textbox" placeholder="Write your comment!" onChange={(e) => setcontent(e.target.value)} 
                    //the following lines where to add an icon inside the textfield
                    InputProps={{
                        disableUnderline:true, //this line along with variant"standard" where added to remove the border of the textfield
                        endAdornment: (        //border:none didn't work
                            <InputAdornment>
                                <Emoji className="emoji"/>
                            </InputAdornment>)
                            }}
                    />
                </span>
            </React.Fragment>
        );
}
 
export default Comment;