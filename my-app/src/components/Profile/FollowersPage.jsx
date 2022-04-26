import React, { useState } from "react";
import "./Styles/FollowersPage.css";
import SideBar from "./SideBar";
import MyFollowers from "./MyFollowers";
import Searchbar from "../Homepage/Search";

/**
 *
 * @param {props} props Getting which page we are in it and if it's admin or not
 * @returns Returns the followers page
 */
function FollowersPage(props) {
  return (
    <div className="FollowersPage">
      <SideBar Profile isAdmin={props.isAdmin} />
      <MyFollowers />
      <div className="rightbar">
        <div className="searchbar">
          <Searchbar />
        </div>
      </div>
    </div>
  );
}

export default FollowersPage;
