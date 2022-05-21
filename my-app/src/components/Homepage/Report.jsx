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
  console.log(id);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  let { reportType } = useParams();
  console.log(reportType);
  // let { id } = useParams();
  let type;
  if (reportType == "Profile") {
    type = false;
  } else if (reportType == "Lar") {
    type = true;
  }
  localStorage.setItem("id",id);
  const reportHandeler = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"Tweet",
    msg:"I'm not intersted in this Lar",
    reportedId:id,
    }
    console.log(data);
        axios.post(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/user/report`, data,bla).then((res) => {
            console.log(res);
            console.log()
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
  const reportHandeler2 = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"Tweet",
    msg:"It displays a senstive photo or video",
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
  const reportHandeler3 = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"Tweet",
    msg:" It's abusive or harmful",
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
  const reportHandeler4 = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"Tweet",
    msg:" It expresses intentions of self-harm or sucide",
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
  const reportHandeler5 = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"User",
    msg:"I'm not intersted in this Account",
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
  const reportHandeler6 = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"User",
    msg:"It's suspicious or spam",
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
  const reportHandeler7 = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"User",
    msg:"It appears thier account is hacked",
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
  const reportHandeler8 = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"User",
    msg:"They are pretending to be me or some one else",
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
  const reportHandeler9 = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"User",
    msg:"Their profile info and/or images include abusive or hateful content",
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
  const reportHandeler10 = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"User",
    msg:"Their Lars are abusive or hateful",
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
  const reportHandeler11 = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
    var data={
    type:"User",
    msg:" They're expressing intentions of self-harm or suicide",
    reportedId:id,
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
  return (
    <div>
      <SideBar Home isAdmin={props.isAdmin} newnotifications={props.newnotifications}/>
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
                <Button onClick={reportHandeler} className="btngroupofreppee">
                  <NavLink className="Repbtnanchor" to="/ReportAction">
                    I'm not intersted in this Lar
                  </NavLink>
                </Button>
              ) : (
                <Button onClick={reportHandeler5} className="btngroupofreppee">
                  <NavLink className="Repbtnanchor" to="/Home">
                    I'm not intersted in this Account
                  </NavLink>
                </Button>
              )}
              {type ? (
                <Button onClick={reportHandeler1} className="btngroupofrepp">
                <NavLink className="Repbtnanchor" to="/ReportAction">
                  It's suspicious or spam
                </NavLink>
              </Button>
              ) : (
                <Button onClick={reportHandeler6} className="btngroupofrepp">
                <NavLink className="Repbtnanchor" to="/Home">
                  It's suspicious or spam
                </NavLink>
              </Button>
              )}
              {type ? (
                <Button onClick={reportHandeler2} className="btngroupofrepp">
                  <NavLink className="Repbtnanchor" to="/ReportAction">
                    it displays sestive photo or video 
                  </NavLink>
                </Button>
              ) : (
                <Button onClick={reportHandeler7} className="btngroupofrepp">
                  <NavLink className="Repbtnanchor" to="/Home">
                  It appears thier account is hacked 
                  </NavLink>
                </Button>
              )}                 
              {type ? (
                <Button onClick={reportHandeler3} className="btngroupofrepp">
                  <NavLink className="Repbtnanchor" to="/ReportAction">
                  It's abusive or harmful
                  </NavLink>
                </Button>
              ) : (
                <Button onClick={reportHandeler8} className="btngroupofrepp">
                  <NavLink className="Repbtnanchor" to="/Home">
                    They are pretending to be me or some one else 
                  </NavLink>
                </Button>
              )}
              {type ? (
                <div>
                </div>
              ) : (
                <Button onClick={reportHandeler9} className="btngroupofrepp   ">
                  <NavLink className="Repbtnanchor" to="/Home">
                  Their profile info and/or images include abusive or hateful content
                  </NavLink>
                </Button>
              )}
              {type ? (
                <div>
                </div>
              ) : (
                <Button onClick={reportHandeler10} className="btngroupofrepp   ">
                  <NavLink className="Repbtnanchor" to="/Home">
                  Their Lars are abusive or hateful
                  </NavLink>
                </Button>
              )}
              {type ? (
                <Button onClick={reportHandeler4} className="btngroupofrepplast">
                  <NavLink className="Repbtnanchor" to="/ReportAction">
                  It expresses intentions of self-harm or sucide
                  </NavLink>
                </Button>
              ) : (
                <Button onClick={reportHandeler11} className="btngroupofrepplast">
                  <NavLink className="Repbtnanchor" to="/Home">
                  They're expressing intentions of self-harm or suicide
                  </NavLink>
                </Button>
              )}
            
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
