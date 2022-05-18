import React ,{ useState } from "react";
import "./Styles/tweet.css";
/**
 * this function renders the text area where tweet will be written
 * @param {props} props setting the value of the the tweet 
 * @returns the text area
 */
function Tweet(props){
    // console.log(props.ali[0]);
return(
    <div className="TweetDiv ">
        <textarea id="1" rows={8} value={props.value} className="form-control" aria-label="With textarea" maxLength="280" placeholder="What's Happening" onChange={props.onChangeHandeler} spellCheck="false"></textarea>
        {props.ali[0]? (
            <div className="form-group multi-preview">
            {/* <img alt="not found" width={"450px"} src={URL.createObjectURL(props.ali[0])} /> */}
            {(props.ali || []).map((url,index) => (
                        <img key={index} width={"250px"} src={URL.createObjectURL(url)} alt="..." />
                    ))}

                    
            <br />
            </div>):<></>}
        {/* <Button />   */}
    </div>
);
}
export default Tweet;