import React, { useEffect, useState } from "react";
import "./Styles/MyProfile.css";
import ProfileName from "./ProfileName";
import Avatar from "@mui/material/Avatar";
import ProfileInfo from "./ProfileInfo";
import EditProfile from "./EditProfile";
import { Button } from "@mui/material";
import MyProfileTabs from "./MyProfileTabs";
import { useParams } from "react-router-dom";
import axios from "axios";
import Post from "../Homepage/Post";
import PostReplies from "../Homepage/PostReplies";
import { FallingLines } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
/**
 *
 * @param {props} props Getting if it's admin
 * @returns Returns the main section of the profile page.
 */
function MyProfile(props) {
  let { id } = useParams();
  const route = useLocation();
  const [joinedDate, setJoinedDate] = useState("");
  const [buttonPopup, setButtonPopup] = useState(false);
  const [userTweets, setUserTweets] = useState([]);
  const [userRepliesTweets, setUserRepliesTweets] = useState([]);
  const [coverImage, setCoverImage] = useState("");
  const [Tag, setTag] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [Following, setFollowing] = useState(0);
  const [birthDate, setBirthDate] = useState("");
  const [birthDateVisability, setbirthDateVisability] = useState(true);
  const [Name, setName] = useState("");
  const [Bio, setBio] = useState("");
  const [Location, setLocation] = useState("");
  const [Website, setWebsite] = useState("");
  const [locationVisability, setlocationVisability] = useState(true);

  const [Followers, setFollowers] = useState(0);

  const [banDuration, setBanDuration] = useState("");

  useEffect(() => {
    setUserTweets([]);
    setUserRepliesTweets([]);
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
          setName(res.data.screenName);
          setBio(res.data.Biography);
          setLocation(res.data.location.place);
          setWebsite(res.data.website);
          setlocationVisability(res.data.location.visability);
          setJoinedDate(res.data.createdAt);
          setFollowers(res.data.followercount);
          setCoverImage(res.data.banner.url);
          setTag(res.data.tag);
          setBanDuration(res.data.ban);
          setProfilePhoto(res.data.profileAvater.url);
          setFollowing(res.data.followingcount);
          setBirthDate(res.data.birth.date);
          setbirthDateVisability(res.data.birth.visability);
        }
      });

    if (route.pathname === `/Profile/${id}`) {
      axios
        .get(
          `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/tweet/user/${id}`,
          {
            headers: { Authorization: localStorage.getItem("accessToken") },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.error) {
            console.log("Error");
          } else {
            setUserTweets(res.data);
          }
        });
    }
    if (route.pathname === `/Profile/${id}/with_replies`) {
      axios
        .get(
          `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/replies/${id}`,
          {
            headers: { Authorization: localStorage.getItem("accessToken") },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.error) {
            console.log("Error");
          } else {
            setUserRepliesTweets(res.data);
          }
        });
    }
    if (route.pathname === `/Profile/${id}/media`) {
      axios
        .get(
          `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/media/${id}`,
          {
            headers: { Authorization: localStorage.getItem("accessToken") },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.error) {
            console.log("Error");
          } else {
            setUserTweets(res.data);
          }
        });
    }
    if (route.pathname === `/Profile/${id}/likes`) {
      axios
        .get(
          `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/likedtweets/${id}`,
          {
            headers: { Authorization: localStorage.getItem("accessToken") },
          }
        )
        .then((res) => {
          console.log(res);
          if (res.error) {
            console.log("Error");
          } else {
            setUserTweets(res.data);
          }
        });
    }
  }, [route.pathname, id]);

  const passdeletedTweet = (id) => {
    axios
      .delete(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/tweet/${id}`,
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.error || !res.data === "success") {
          alert("something went wrong");
        } else {
          window.location.reload();
          axios
            .get(
              `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/tweet/user/${id}`,
              {
                headers: { Authorization: localStorage.getItem("accessToken") },
              }
            )
            .then((res) => {
              console.log(res);
              if (res.error) {
                console.log("Error");
              } else {
                setUserTweets(res.data);
                window.location.reload();
                window.location.reload();
              }
            });
        }
        //retweetCount();
      })
      .catch((err) => {
        //err.message; // 'Oops!'
        alert("Error occured while deleting");
        console.log(err);
      });
  };

  if (Name && userTweets) {
    return (
      <div className="myProfile">
        <div className="myProfileName">
          <ProfileName pName={Name} pID={Tag} />
        </div>
        <Avatar
          onClick={
            coverImage
              ? () => {
                  window.location = coverImage;
                }
              : null
          }
          className="coverImage"
          variant="square"
          sx={{ width: "auto", height: 220 }}
          alt={Name}
          src={coverImage}
        />
        <div className="profileSetup">
          <Avatar
            onClick={
              profilePhoto
                ? () => {
                    window.location = profilePhoto;
                  }
                : null
            }
            className="profileImage"
            alt={Name}
            src={profilePhoto}
          />

          <Button
            className="setupProfileButton"
            onClick={() => setButtonPopup(true)}
            variant="outlined"
            fullWidth
            data-testid="Edit-Profile-Button"
          >
            {profilePhoto || Bio ? "Edit Profile" : "Set Up Profile"}
          </Button>

          <EditProfile
            buttonPopup={buttonPopup}
            setButtonPopup={() => setButtonPopup(true)}
            closeButtonPopup={() => setButtonPopup(false)}
            Name={Name}
            Bio={Bio}
            Location={Location}
            Website={Website}
            profilePhoto={profilePhoto}
            coverPhoto={coverImage}
          />
        </div>

        <ProfileInfo
          name={Name}
          userName={Tag}
          date={joinedDate}
          followers={Followers}
          following={Following}
          bio={Bio}
          location={Location}
          locationVisability={locationVisability}
          website={Website}
          birthday={birthDate}
          birthdayVisability={birthDateVisability}
        />

        {/*Tweets First Tab */}
        {route.pathname === `/Profile/${id}` ? <MyProfileTabs Tweets /> : <></>}
        {userTweets?.length && route.pathname === `/Profile/${id}` ? (
          userTweets.map((post) => (
            <Post
              post={post}
              passdeletedTweet={passdeletedTweet}
              isAdmin={props.isAdmin}
              isPost={true}
              canviewcomments={false}
            />
          ))
        ) : (
          <></>
        )}

        {/*Tweets Second Tab */}
        {route.pathname === `/Profile/${id}/with_replies` ? (
          <MyProfileTabs Replies />
        ) : (
          <></>
        )}
        {userRepliesTweets?.length &&
        route.pathname === `/Profile/${id}/with_replies` ? (
          userRepliesTweets.map((post) => (
            <PostReplies
              post={post}
              passdeletedTweet={passdeletedTweet}
              isAdmin={props.isAdmin}
              isPost={true}
              canviewcomments={true}
            />
          ))
        ) : (
          <></>
        )}

        {/*Tweets Third Tab */}
        {route.pathname === `/Profile/${id}/media` ? (
          <MyProfileTabs Media />
        ) : (
          <></>
        )}
        {userTweets.length && route.pathname === `/Profile/${id}/media` ? (
          userTweets.map((post) => (
            <Post
              post={post}
              passdeletedTweet={passdeletedTweet}
              isAdmin={props.isAdmin}
              isPost={true}
              canviewcomments={true}
            />
          ))
        ) : (
          <></>
        )}

        {/*Likes Fourth Tab */}
        {route.pathname === `/Profile/${id}/likes` ? (
          <MyProfileTabs Likes />
        ) : (
          <></>
        )}
        {userTweets.length && route.pathname === `/Profile/${id}/likes` ? (
          userTweets.map((post) => (
            <Post
              post={post}
              passdeletedTweet={passdeletedTweet}
              isAdmin={props.isAdmin}
              isPost={true}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    return (
      <div className="Loader">
        <FallingLines height={120} width={150} color="var(--color-mode)" />
      </div>
    );
  }
}
export default MyProfile;
