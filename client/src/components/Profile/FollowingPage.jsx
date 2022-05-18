import React, { useState,useEffect } from "react";
import "./Styles/FollowingPage.css";
import SideBar from "./SideBar";
import MyFollowing from "./MyFollowing";
import Searchbar from "../Homepage/Search";
import { useParams } from "react-router-dom";
import axios from "axios";
/**
 *
 * @param {props} props Getting which page we are in it and if it's admin or not
 * @returns Returns the following page
 */

function FollowingPage(props) {
  const [darkMode, setDarkMode] = useState(false);
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${id}/me`,
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Error");
        } else {
          setDarkMode(res.data.darkMode);
        }
      });
  }, [id]);
  return (
    <div className="FollowingPage">
      <SideBar Profile isAdmin={props.isAdmin} darkMode={darkMode} />
      <MyFollowing />
      <div className="rightbar">
        <div className="searchbar">
          <Searchbar />
        </div>
      </div>
    </div>
  );
}

export default FollowingPage;
