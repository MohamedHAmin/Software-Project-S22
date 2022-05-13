import React ,{ useState } from "react";
import "./Styles/tweet.css";
/**
 * this function renders the text area where tweet will be written
 * @param {props} props setting the value of the the tweet 
 * @returns the text area
 */
function Tweet(props){
    console.log(props);
    return(
    <div className="TweetDiv ">
        <textarea id="1" rows={8} value={props.value} className="form-control" aria-label="With textarea" maxLength="280" placeholder="What's Happening" onChange={props.onChangeHandeler} spellCheck="false"></textarea>
        {props.ali? (
            <div>
            <img alt="not found" width={"450px"} src={URL.createObjectURL(props.ali)} />
            <br />
            </div>):<></>}
        {/* <Button />   */}
    </div>
);
}
export default Tweet;