import React, { useState ,useEffect } from "react";
import "./Styles/ReportAction.css";
import CloseIcon from '@mui/icons-material/Close';import SideBar from "../Profile/SideBar";
import Button from '@mui/material/Button';


function ReportAction() {
     
    return (
      <div className="ReportAction" >
        <SideBar Home/>
        <div className="subrebActdiv">
        <div className="subsubrepActdiv">
        <a  className="XArrow" href="/Home"><CloseIcon/></a>
        <h3 className="b3">Report an issue</h3>
        </div>
        <h3 className="b33">Thanks for letting us know</h3>
        <p className="repActanch"><a href="https://support.twitter.com/articles/20170134">Learn more</a> about ways to improve your experience at Twitter.</p>
        <h3 className="b33">Mute@Emad</h3>
        <div className="u">
        <p>Since you are not following @ahmedEmad64, you will no longer see Tweets, Retweets, or notifications from @ahmedEmad64.</p>
        <Button className="yy" variant="outlined">Mute</Button>
        <h3 className="b334">Block@Emad</h3>
        <p>@ahmedEmad64 will not be able to follow you or view your Tweets,<br/> and you will not see Tweets or notifications from @ahmedEmad64.<br/> Learn more about what it means to block an account.</p>
        <Button className="yy" variant="outlined" color="error">Block</Button>

        </div>
        {/* <p className="repanch"><a href="https://help.twitter.com/en/rules-and-policies/twitter-report-violation#specific-violations">Learn more</a> about reporting violations of our rules.</p> */}
        </div>
        
      </div>
      );
  }
  export default ReportAction;