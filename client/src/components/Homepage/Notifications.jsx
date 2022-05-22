import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Logo from "../../Images/Logo Title Page.png";
import "./Styles/Notifications.css";
import axios from "axios";
import Stack from "@mui/material/Stack";
import SideBar from "./../Profile/SideBar";
import PrivateFollowRequests from "./PrivateFollowRequests";
import { useParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroll-component';

function Notifications(props) {
  const [notifications, setnotifications] = useState([]);
  const [followrequests, setfollowrequests] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [hasmore,sethasmore]=useState(true);
  const [skip,setskip]=useState(0);
  let { id } = useParams();

  console.log(notifications);
  const getnotifications=()=>{
    axios
      .get(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/notification?limit=10&skip=${skip}`,
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Error");
        } else {
          var prevnotifications=notifications;
          setskip(skip+10);
          var currentnotifications=[...prevnotifications,...res.data.notifications];
          setnotifications(currentnotifications);
          if(prevnotifications.length===currentnotifications.length)
          {
            sethasmore(false);
          }
        }
      });
  }

  useEffect(() => {
    getnotifications();
    axios
      .get(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/notification?limit=1000`,
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Error");
        } else {
          localStorage.setItem("lastseennotifications",res.data.notifications.length);
          console.log(res.data.notifications.length)
        }});
    axios
      .get(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/privateRequest`,
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Error");
        } else {
          setfollowrequests(res.data);
        }
      });
    axios
      .get(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${id}/me`,
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Error");
        } else {
          setDarkMode(res.data.darkMode);
        }
      });
  }, [id]);

  const fetchMoreData=()=>{
    getnotifications();
  }

  const handleAccept = (id) => {
    axios
      .get(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/acceptRequest/${id}`,
        { headers: { Authorization: localStorage.getItem("accessToken") } }
      )
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Error");
        } else {
          axios
            .get(
              `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/notification`,
              {
                headers: { Authorization: localStorage.getItem("accessToken") },
              }
            )
            .then((res) => {
              console.log(res);
              if (res.error) {
                console.log("Error");
              } else {
                setnotifications(res.data.notifications);
                window.location.reload();
              }
            });
          axios
            .get(
              `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/privateRequest`,
              {
                headers: { Authorization: localStorage.getItem("accessToken") },
              }
            )
            .then((res) => {
              console.log(res);
              if (res.error) {
                console.log("Error");
              } else {
                setfollowrequests(res.data);
                window.location.reload();
              }
            });
        }
      });
  };
  //const date=new Date();
  return (
    <div className="Notifications">
      <SideBar isAdmin={props.isAdmin} Notifications darkMode={darkMode} />
      <div className="NotificationsContainer">
        {followrequests.length ? (
          followrequests.map((followrequest, index) => (
            <PrivateFollowRequests
              index={index}
              followrequest={followrequest}
              passdata={handleAccept}
            />
          ))
        ) : (
          <></>
        )}
        <InfiniteScroll
          dataLength={notifications.length} 
          next={fetchMoreData}
          hasMore={hasmore}
          loader={<h4>Loading...</h4>}
          endMessage={<></>}
          >
        {notifications?.length ? (
          notifications.map((notification, index) => (
            <div key={index} className="comments">
              <img className="logo" src={Logo} />
              <Stack spacing={1} direction="row" alignItems="flex-start">
                {notification.userId ? (
                  <Avatar src={notification.userId.profileAvater.url} />
                ) : (
                  <></>
                )}
                <Stack direction="column" alignItems="flex-start">
                  <Stack direction="row">
                    <div>{notification.text}</div>
                  </Stack>
                  <Stack direction="row">
                    <p>
                      {new Date(notification.createdAt).getDate()}/
                      {new Date(notification.createdAt).getMonth() + 1}/
                      {new Date(notification.createdAt).getFullYear()}
                      &nbsp;&nbsp;
                    </p>
                    <p>
                      {new Date(notification.createdAt).getHours()}:
                      {new Date(notification.createdAt).getMinutes()}
                    </p>
                  </Stack>
                </Stack>
              </Stack>
            </div>
          ))
        ) : (
          <></>
        )}
        </InfiniteScroll>
        {!followrequests.length && !notifications.length && (
          <Stack className="comments" direction="column">
            <Stack direction="row">
              <p>No notifications yet?</p>
            </Stack>
            <Stack direction="row">
              <p>
                1) Check your settings -{">"} notifications and allow push
                notifications
              </p>
            </Stack>
            <Stack direction="row">
              <p>
                2) Still a new member? Start following people, post lars, and
                enjoy Larry!
              </p>
            </Stack>
          </Stack>
        )}
      </div>
      <div className="Notificationrightbar"></div>
    </div>
  );
}
export default Notifications;
