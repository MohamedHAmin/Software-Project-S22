import React, { useState } from "react";
import "./Styles/ProfilePage.css";
import SideBar from "./SideBar";
import MyProfile from "./MyProfile";
import Searchbar from "../Homepage/Search";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
/**
 *
 * @param {props} props Getting if it's admin.
 * @returns Returns the whole profile page.
 */
function ProfilePage(props) {
  let { id } = useParams();

  useEffect(() => {}, [id]);

  return (
    <div className="ProfilePage">
      <SideBar Profile isAdmin={props.isAdmin} />
      <MyProfile isAdmin={props.isAdmin} />
      <div className="rightbar">
        <div className="searchbar">
          <Searchbar />
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
