import React, { useState, useEffect } from "react";
import "./Styles/Report.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SideBar from "../Profile/SideBar";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

/**
 * this function renders the report page
 * @param {props} props it handles admin view 
 * @returns Report page
 */
function Report(props) {
  let { id } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const reportHandeler = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"Tweet",
    msg:"I'm not intersted in this Lar",
    reportedId:id
    }
    console.log(data);
        axios.post(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/user/report`, data,bla).then((res) => {
            console.log(res);
            if (res.error) {
              alert("Erorr")
            } else {
            }
        })
  };
  const reportHandeler1 = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"Tweet",
    msg:"It's suspicious or spam",
    reportedId:"626569714da8e6986213c0b0"
    }
    console.log(data);
        axios.post(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/user/report`, data,bla).then((res) => {
            console.log(res);
            if (res.error) {
              alert("Erorr")
            } else {
            }
        })
  };
  const reportHandeler2 = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"Tweet",
    msg:"It displays a senstive photo or video",
    reportedId:"626569714da8e6986213c0b0"
    }
    console.log(data);
        axios.post(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/user/report`, data,bla).then((res) => {
            console.log(res);
            if (res.error) {
              alert("Erorr")
            } else {
            }
        })
  };
  const reportHandeler3 = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"Tweet",
    msg:" It's abusive or harmful",
    reportedId:"626569714da8e6986213c0b0"
    }
    console.log(data);
        axios.post(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/user/report`, data,bla).then((res) => {
            console.log(res);
            if (res.error) {
              alert("Erorr")
            } else {
            }
        })
  };
  const reportHandeler4 = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"Tweet",
    msg:" It expresses intentions of self-harm or sucide",
    reportedId:"626569714da8e6986213c0b0"
    }
    console.log(data);
        axios.post(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/user/report`, data,bla).then((res) => {
            console.log(res);
            if (res.error) {
              alert("Erorr")
            } else {
            }
        })
  };
  let { reportType } = useParams();
  // let { id } = useParams();
  let type;
  if (reportType == "Profile") {
    type = false;
  } else if (reportType == "Lar") {
    type = true;
  }
  return (
    <div>
      <SideBar Home isAdmin={props.isAdmin}/>
      <div className="Report">
        <div className="subrebdiv">
          <div className="subsubrepdiv">
            <ArrowBackIcon className="backArrow" onClick={() => navigate(-1)} />
            <h3 className="H3">Report an issue</h3>
          </div>
          {type ? (
            <h3 className="H33">
              Help us understand the problem. What is going on with this Lar?
            </h3>
          ) : (
            <h3 className="H33">
              Help us understand the problem. What is going on with this
              Profile?
            </h3>
          )}
          <div className="pos">
            <ButtonGroup
              className="hehe"
              orientation="vertical"
              variant="text"
              aria-label="outlined primary button group"
              color="inherit"
            >
              {type ? (
                <Button onClick={reportHandeler} className="btngroupofrepp">
                  <NavLink className="Repbtnanchor" to="/ReportAction">
                    I'm not intersted in this Lar
                  </NavLink>
                </Button>
              ) : (
                <Button className="btngroupofrepp">
                  <NavLink className="Repbtnanchor" to="/ReportAction">
                    I'm not intersted in this Profile
                  </NavLink>
                </Button>
              )}
              <Button onClick={reportHandeler1} className="btngroupofrep">
                <NavLink className="Repbtnanchor" to="/ReportAction">
                  It's suspicious or spam
                </NavLink>
              </Button>
              <Button onClick={reportHandeler2} className="btngroupofrep">
                {" "}
                <NavLink className="Repbtnanchor" to="/ReportAction">
                  It displays a senstive photo or video
                </NavLink>
              </Button>
              <Button onClick={reportHandeler3} className="btngroupofrep">
                {" "}
                <NavLink className="Repbtnanchor" to="/ReportAction">
                  It's abusive or harmful
                </NavLink>
              </Button>
              <Button onClick={reportHandeler4} className="btngroupofreppp">
                <NavLink className="Repbtnanchor" to="/ReportAction">
                  It expresses intentions of self-harm or sucide
                </NavLink>
              </Button>
            </ButtonGroup>
          </div>
          <p className="repanch">
            <a href="https://help.twitter.com/en/rules-and-policies/twitter-report-violation#specific-violations">
              Learn more
            </a>{" "}
            about reporting violations of our rules.
          </p>
        </div>
      </div>
    </div>
  );
}
export default Report;
