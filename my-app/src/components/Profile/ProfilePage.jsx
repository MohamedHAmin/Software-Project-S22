import React from "react";
import './Styles/ProfilePage.css'
import SideBar from "./SideBar";
import MyProfile from "./MyProfile";
import Searchbar from "../Homepage/Search"

function ProfilePage() {
  return (
    <div className="ProfilePage">
    <SideBar Profile />
    <MyProfile />
    <div className="rightbar">
            <div className="searchbar">
                <Searchbar/>
            </div>
    </div>
    </div>
  );
}
export default ProfilePage;
