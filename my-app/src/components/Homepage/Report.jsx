import React, { useState ,useEffect } from "react";
import "./Styles/Report.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SideBar from "../Profile/SideBar";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
function Report() {
     
    return (
      <div className="Report" >
        <SideBar Home/>
        <div className="Ali">
        <div className="karim">
        <ArrowBackIcon/>
        <h3 className="H3">Report an issue</h3>
        </div>
        <h3 className="H33">Help us understand the problem. What is going on with this Lar?</h3>
        <div className="pos">
        <ButtonGroup  orientation="vertical" variant="text" aria-label="outlined primary button group" color="inherit">
        <Button className="btngroupofrepp">i'm not intersted in this tweet</Button>
        <Button className="btngroupofrep">it's suspicious or spam</Button>
        <Button className="btngroupofrep">it displays a senstive photo or video</Button>
        <Button className="btngroupofrep">it's abusive or harmful</Button>
        <Button className="btngroupofreppp">it expresses intentions of self-harm or sucide</Button>
        </ButtonGroup>
        </div>
        <p className="repanch"><a href="https://help.twitter.com/en/rules-and-policies/twitter-report-violation#specific-violations">Learn more</a> about reporting violations of our rules.</p>
        </div>
        
      </div>
      );
  }
  export default Report;