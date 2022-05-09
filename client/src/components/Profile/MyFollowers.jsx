import React, { useEffect, useState } from "react";
import "./Styles/MyFollowers.css";
import ProfileName from "./ProfileName";
import CreateFollower from "./CreateFollower";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
function MyFollowers() {
  let { id } = useParams();
  const [Name, setName] = useState("");
  const [Tag, setTag] = useState("");
  const [myFollowers, setMyFollowers] = useState([]);
  let userID = localStorage.getItem("userId");

  useEffect(() => {
    if (id == userID) {
      axios
        .get(
          `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/profile/${id}/me`,
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          console.log(res);
          if (res.error) {
            console.log("Error");
          } else {
            setName(res.data.screenName);
            setTag(res.data.tag);
          }
        });
    } else {
      axios
        .get(
          `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/profile/${id}`,
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          console.log(res);
          if (res.error) {
            console.log("Error");
          } else {
            setName(res.data.user.screenName);
            setTag(res.data.user.tag);
          }
        });
    }
    axios
      .get(
        `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/user/${id}/follower`,
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Error");
        } else {
          setMyFollowers(res.data);
        }
      });
  }, [userID]);

  return (
    <div className="myFollowers">
      <div className="myProfileName">
        <ProfileName pName={Name} pID={Tag} />
      </div>
      <div>
        {myFollowers.map((follower) => (
          <CreateFollower key={follower._id} contact={follower} />
        ))}
        {/* {myFollowers.length ? (
          myFollowers.map((follower) => (
            <CreateFollower key={follower._id} contact={follower} />
          ))
        ) : (
          <div className="Loader">
            <FallingLines height={120} width={150} color="var(--color-mode)" />
          </div>
        )} */}
      </div>
    </div>
  );
}

export default MyFollowers;
