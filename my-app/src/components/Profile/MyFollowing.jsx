import React, { useEffect, useState } from "react";
import "./Styles/MyFollowing.css";
import ProfileName from "./ProfileName";
import CreateCard from "./CreateCard";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
/**
 *
 * @returns Returns the people i follow.
 */
function MyFollowing() {
  let { id } = useParams();
  const [Name, setName] = useState("");
  const [Tag, setTag] = useState("");
  const [myFollowing, setMyFollowing] = useState([]);
  let userID = localStorage.getItem("userId");
  useEffect(() => {
    if (id == userID) {
      axios
        .get(`http://localhost:4000/profile/${id}/me`, {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
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
        .get(`http://localhost:4000/profile/${id}`, {
          headers: { Authorization: localStorage.getItem("accessToken") },
        })
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
      .get(`http://localhost:4000/user/${id}/following`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Error");
        } else {
          setMyFollowing(res.data);
        }
      });
  }, [userID]);

  return (
    <div className="myFollowing">
      <div className="myProfileName">
        <ProfileName pName={Name} pID={Tag} />
      </div>
      <div>
        {myFollowing.map((following) => (
          <CreateCard key={following._id} contact={following} />
        ))}
        {/* {myFollowing.length ? (
          myFollowing.map((following) => (
            <CreateCard key={following._id} contact={following.followingId} />
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

export default MyFollowing;
