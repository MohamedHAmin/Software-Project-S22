import React, { useState ,useEffect } from "react";
import "./Styles/Report.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SideBar from "../Profile/SideBar";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { NavLink, useNavigate } from "react-router-dom";

function Report() {
  const navigate = useNavigate();
    return (
      <div>
        <SideBar Home/>   
      <div className="Report" >
        <div className="subrebdiv">
        <div className="subsubrepdiv">
        <ArrowBackIcon className="backArrow" onClick={() => navigate(-1)} />
        <h3 className="H3">Report an issue</h3>
        </div>
        <h3 className="H33">Help us understand the problem. What is going on with this Lar?</h3>
        <div className="pos">
        <ButtonGroup className="hehe"  orientation="vertical" variant="text" aria-label="outlined primary button group" color="inherit">
        <Button className="btngroupofrepp"><NavLink className="Repbtnanchor" to="/ReportAction">i'm not intersted in this Lar</NavLink></Button>
        <Button className="btngroupofrep"><NavLink className="Repbtnanchor" to="/ReportAction">it's suspicious or spam</NavLink></Button>
       <Button className="btngroupofrep"> <NavLink className="Repbtnanchor" to="/ReportAction">it displays a senstive photo or video</NavLink></Button>
       <Button className="btngroupofrep"> <NavLink className="Repbtnanchor" to="/ReportAction">it's abusive or harmful</NavLink></Button>
        <Button className="btngroupofreppp"><NavLink className="Repbtnanchor" to="/ReportAction">it expresses intentions of self-harm or sucide</NavLink></Button>
        </ButtonGroup>
        </div>
        <p className="repanch"><a href="https://help.twitter.com/en/rules-and-policies/twitter-report-violation#specific-violations">Learn more</a> about reporting violations of our rules.</p>
        </div>
      </div>
      </div>
      );
  }
  export default Report;