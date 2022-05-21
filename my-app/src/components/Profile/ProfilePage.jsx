import React, { useState, useEffect } from "react";
import "./Styles/ProfilePage.css";
import SideBar from "./SideBar";
import MyProfile from "./MyProfile";
import OthersProfile from "./OthersProfile";
import Searchbar from "../Homepage/Search";
import { useParams } from "react-router-dom";
import axios from "axios";
/**
 *
 * @param {props} props Getting if it's admin.
 * @returns Returns the whole profile page.
 */

function ProfilePage(props) {
  const [darkMode, setDarkMode] = useState(false);
  let { id } = useParams();
  let userID = localStorage.getItem("userId");
  useEffect(() => {
    axios
      .get(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${id}/me`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        if (res.error) {
          console.log("Error");
        } else {
          setDarkMode(res.data.darkMode);
        }
      });
  }, [id]);

  return (
    <div className="ProfilePage">
      <SideBar Profile isAdmin={props.isAdmin} darkMode={darkMode} newnotifications={props.newnotifications}/>
      {id == userID ? <MyProfile /> : <OthersProfile isAdmin={props.isAdmin} />}
      <div className="rightbar">
        <div className="searchbar">
          <Searchbar viewSuggestedAccounts={true}/>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
