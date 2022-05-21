import "./Styles/ReportAction.css";
import React, { useState ,useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';
import SideBar from "../Profile/SideBar";
import Button from '@mui/material/Button';
import {useNavigate} from "react-router-dom";
import axios from "axios";

/**
 *  this function renders the report action page 
 * @param {props} props it handles admin view
 * @returns the report action page 
 */
function ReportAction(props) {
  const [username,setusername]=useState("");
  const [tagname,settagname]=useState("");
  const [iD,setdisplayid]=useState();
  const navigate = useNavigate();
  const d=localStorage.getItem("id");
  // alert(d);
  axios.get(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/tweet/${d}`,
  { headers: { Authorization: localStorage.getItem("accessToken") }}).then((res) => {
    if (res.error) {
      console.log(
        "There was error while attempting to retrieve tweet"
      );
    } else {
      setusername(res.data.authorId.screenName);
      settagname(res.data.authorId.tag);
      setdisplayid(res.data.authorId.id);
      console.log(res.data);
    }
  });
  console.log(d);
  const userId = localStorage.getItem("userId");
const reportHandeler = () => {
    var bla={
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
        axios.post(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/user/${userId}/unfollow/${iD}`,{},bla).then((res) => {
            console.log(res);
            if (res.error) {
              alert("Erorr")
            } else {
            }
        })
        navigate(-2);
  };
    return (
      <div>
        <SideBar Home isAdmin={props.isAdmin} newnotifications={props.newnotifications}/>
      <div className="ReportAction" >
        <div className="subrebActdiv">
        <div className="subsubrepActdiv">
        <CloseIcon  onClick={() => navigate(-2)} />
        <h3 className="b3">Report an issue</h3>
        </div>
        <h3 className="b33">Thanks for letting us know</h3>
        <p className="repActanch"><a href="https://support.twitter.com/articles/20170134">Learn more</a> about ways to improve your experience at Twitter.</p>
        <h3 className="b33">{"Mute "+username}</h3>
        <div className="u">
        <p className="Ptag">Since you are not following {"@"+tagname}, you will no longer see Tweets, Retweets, or notifications from {"@"+tagname}.</p>
        <Button onClick={reportHandeler} className="yy" variant="outlined">UnFollow</Button>
        </div>
        {/* <p className="repanch"><a href="https://help.twitter.com/en/rules-and-policies/twitter-report-violation#specific-violations">Learn more</a> about reporting violations of our rules.</p> */}
        </div>
        </div>

      </div>
      );
  }
  export default ReportAction;