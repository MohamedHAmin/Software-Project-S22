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
        <div className="subrebdiv">
        <div className="subsubrepdiv">
        <a  className="BackArrow" href="/Home"><ArrowBackIcon/></a>
        <h3 className="H3">Report an issue</h3>
        </div>
        <h3 className="H33">Help us understand the problem. What is going on with this Lar?</h3>
        <div className="pos">
        <ButtonGroup className="hehe"  orientation="vertical" variant="text" aria-label="outlined primary button group" color="inherit">
        <Button className="btngroupofrepp"><a className="Repbtnanchor" href="/ReportAction">i'm not intersted in this Lar</a></Button>
        <Button className="btngroupofrep"><a className="Repbtnanchor" href="/ReportAction">it's suspicious or spam</a></Button>
       <Button className="btngroupofrep"> <a className="Repbtnanchor" href="/ReportAction">it displays a senstive photo or video</a></Button>
       <Button className="btngroupofrep"> <a className="Repbtnanchor" href="/ReportAction">it's abusive or harmful</a></Button>
        <Button className="btngroupofreppp"><a className="Repbtnanchor" href="/ReportAction">it expresses intentions of self-harm or sucide</a></Button>
        </ButtonGroup>
        </div>
        <p className="repanch"><a href="https://help.twitter.com/en/rules-and-policies/twitter-report-violation#specific-violations">Learn more</a> about reporting violations of our rules.</p>
        </div>
        
      </div>
      );
  }
  export default Report;