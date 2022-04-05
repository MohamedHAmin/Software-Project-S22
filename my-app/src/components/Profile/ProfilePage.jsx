import React from "react";
import './Styles/ProfilePage.css'
import SideBar from "./SideBar";
import MyProfile from "./MyProfile";
import Searchbar from "../Homepage/Search"

function ProfilePage() {
  const name ="Ahmed Emad";
  const tweetNum = 12;
  const userName="Ahmed_Emad81";
  const date="October 2020";
  const followers= 13;
  const following= 10;
  return (
    <div className="ProfilePage">
    <SideBar Profile />
    <MyProfile name={name} tweets={tweetNum} userName={userName} date={date} followers={followers} following={following} />
    <div className="rightbar">
            <div className="searchbar">
                <Searchbar/>
            </div>
    </div>
    </div>
  );
}
export default ProfilePage;
