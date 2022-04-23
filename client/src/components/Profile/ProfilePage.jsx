import React, { useState } from "react";
import "./Styles/ProfilePage.css";
import SideBar from "./SideBar";
import MyProfile from "./MyProfile";
import Searchbar from "../Homepage/Search";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
function ProfilePage(props) {
  let { id } = useParams();
  //const [name, setName] = useState("Ahmed Emad");
  //const [bio, setBio] = useState("Pyyschooooooo");
  //const [location, setLocation] = useState("6th of October");
  //const [website, setWebsite] = useState("https://twitter.com/Ahmed_Emad81");
  //const [followers, setFollowers] = useState(13);
  //const [banDuration, setBanDuration] = useState("");
  //const [user,setUser] = useState([]);

  useEffect(() => {}, [id]);

  //var tweetNum = 12;
  //const userName = "Ahmed_Emad81";
  //var date = "October 2020";
  //var following = 10;
  //var isFollowed = false;
  //var isAdmin = true;
  //var sameUserProf = true;
  //const birthday = "12/9/2001";
  //var picture =
  //  "https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y";
  //var pictureCover =
  //  "https://i.picsum.photos/id/1025/4951/3301.jpg?hmac=_aGh5AtoOChip_iaMo8ZvvytfEojcgqbCH7dzaz-H8Y";

  return (
    <div className="ProfilePage">
      <SideBar Profile isAdmin={props.isAdmin}/>
      <MyProfile />
      <div className="rightbar">
        <div className="searchbar">
          <Searchbar />
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
