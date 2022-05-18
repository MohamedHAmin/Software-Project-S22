import React, { useEffect, useState } from "react";
import "./Styles/MyFollowing.css";
import ProfileName from "./ProfileName";
import CreateCard from "./CreateCard";
import { useParams } from "react-router-dom";
import axios from "axios";
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
    if (id === userID) {
      axios
        .get(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${id}/me`, {
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
        .get(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${id}`, {
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
      .get(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/user/${id}/following`, {
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
  }, [id,userID]);

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
