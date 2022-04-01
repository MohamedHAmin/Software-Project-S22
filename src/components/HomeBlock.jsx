import React,{useCallback,useState} from "react";
import "./Styles/HomeBlock.css"
import imageIcon from '@mui/icons-material/ImageOutlined';
import pollIcon from '@mui/icons-material/PollOutlined';
import gifIcon from '@mui/icons-material/GifBoxOutlined';
import {Button} from "@mui/material";

const HomeBlock=({parentCallback})=>
{
    const [value, setValue] = useState("");
    const [tweetContent,setTweetContent]=useState("");
    const [newtweet,setNewTweet]=useState(false);
    const clickHandler = ()=>
    {
        if (value!="")
        {
            setTweetContent(value);
            setNewTweet(true);
            parentCallback(value,true);
        }
    };
    return(
        <React.Fragment>
            <div className="homeblock">
                <h3>Home</h3>
                <textarea type="text" variant="standard" value={value} onChange={(e)=>{setValue(e.target.value)}} id="T1" className="homebox" placeholder="What's on your mind!"/>
                <ul className="homeIcon">
                    <li className="l1">{React.createElement(imageIcon)}</li>
                    <li className="l2">{React.createElement(pollIcon)}</li>
                    <li className="l3">{React.createElement(gifIcon)}</li>
                </ul>
                <div>
                    <Button className="tweetButton"  variant="outlined" fullWidth onClick={clickHandler}>Lar
                    </Button>
                </div>
            </div>
        </React.Fragment>
    );
}
export default HomeBlock;