import React, { useState, useEffect } from "react";
import "./Styles/Homepage.css";
import "./Styles/Explore.css";
import SideBar from "../Profile/SideBar";
import Searchbar from "./Search";
import axios from "axios";
import Post from "./Post";
import { useParams } from "react-router-dom";
import SuggestedAccounts from "./SuggestedAccounts";
/**
 * this function renders explore page component
 * @param {*} props this props passes the explore posts to EplorePost component
 * @returns renderd explore page
 */
function Explore(props) {
const [darkMode, setDarkMode] = useState(false);
const[Postt,setpostt]=useState([]);
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
      if (res.error) {
        console.log("Error");
      } else {
        setDarkMode(res.data.darkMode);
      }
    });
  axios
    .get(
      `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/explore`,
      {
        headers: { Authorization: localStorage.getItem("accessToken") },
      }
    )
    .then((res) => {
      console.log(res);
      if (res.error) {
        console.log("Error");
      } else {
         setpostt(res.data);
      }
    });
  }, []);

  for (var i = 0; i < Postt.length; i++) {

      console.log(Postt[i].authorId.profileAvater);

  }

return (
    <div className="Homepage">
      <SideBar Search isAdmin={props.isAdmin} darkMode={darkMode} newnotifications={props.newnotifications}/>
      <div className="postConatiner">
      <div className="Expsearch">
          <Searchbar viewSuggestedAccounts={false}/>
        </div>
        <div className="blabla">
        {Postt.length ? (
          Postt.map((post) => (
            <Post
            post={post}
            // passdeletedTweet={passdeletedTweet}
            isAdmin={props.isAdmin}
            isPost={true}
            canviewcomments={true}
            />
            ))
            ) : (<></>)}
        </div>
      </div>
      <div className="suggestedAccRightbar">
        <div className="suggestedAccBlock">
          <SuggestedAccounts/>
        </div>
      </div>
      </div>
  );
}
export default Explore;