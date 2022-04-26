import React, { useState } from "react";
import "./Styles/FollowingPage.css";
import SideBar from "./SideBar";
import MyFollowing from "./MyFollowing";
import Searchbar from "../Homepage/Search";
import { useParams } from "react-router-dom";
/**
 *
 * @param {props} props Getting which page we are in it and if it's admin or not
 * @returns Returns the following page
 */
function FollowingPage(props) {
  return (
    <div className="FollowingPage">
      <SideBar Profile isAdmin={props.isAdmin} />
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
