import React, { useState } from "react";
import "./Styles/ProfilePage.css";
import SideBar from "./SideBar";
import MyProfile from "./MyProfile";
import OthersProfile from "./OthersProfile";
import Searchbar from "../Homepage/Search";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
/**
 *
 * @param {props} props Getting if it's admin.
 * @returns Returns the whole profile page.
 */

function ProfilePage(props) {
  const [darkMode, setDarkMode] = useState(false);

  let { id } = useParams();
  let userID = localStorage.getItem("userId");
  console.log(id);
  console.log(userID);
  return (
    <div className="ProfilePage">
      <SideBar Profile isAdmin={props.isAdmin} darkMode={darkMode} />
      {id == userID ? (
        <MyProfile setDarkMode={setDarkMode} />
      ) : (
        <OthersProfile isAdmin={props.isAdmin} setDarkMode={setDarkMode} />
      )}
      <div className="rightbar">
        <div className="searchbar">
          <Searchbar />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
