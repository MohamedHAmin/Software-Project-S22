import React,{useState} from "react";
import "./Styles/Comment.css"
import InputEmoji from 'react-input-emoji'

function Comment(props){
    const [content,setcontent]=useState("");   
    function enterHandler ()
    {
            if (content!="")
            {
                props.passData(content);
            }
    };
    return (
        <React.Fragment>
            <span id="1" className="comment">
            <InputEmoji
          value={content}
          onChange={setcontent}
          cleanOnEnter
          onEnter={enterHandler}
          placeholder="Write your comment!"
          maxLength={280}
        />
            </span>
        </React.Fragment>
        );
}
 
export default Comment;