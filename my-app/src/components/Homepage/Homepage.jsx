import React, { useState, useEffect } from "react";
import "./Styles/Homepage.css";
import SideBar from "../Profile/SideBar";
import Header from "./Header";
import Tweet from "./tweet";
import TweetBar from "./TweetBar";
import Post from "./Post";
import Searchbar from "./Search";
import axios from "axios";
import { useParams } from "react-router-dom";

/**
 * Homepage containing area to post tweets and timeline tweets (your tweets and tweets of people you follow)
 * it also contains sidebar to navigate through pages and it also contains searchbar
 * @component 
 * @param {boolean} isAdmin indicates whether or not this home is an admin's home or a normal user's home
 * @returns {div}
 *        <Homepage isAdmin={isAdmin}/>
 */
function Homepage(props) {
  const [posts, setposts] = useState([]);
  const [token,setToken]=useState(localStorage.getItem("accessToken"));
  const [admintoken,setAdminToken]=useState(localStorage.getItem("adminToken"));
  const [text, setText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  let { id } = useParams();
  const getposts = () => {
    axios
      .get(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/timeline`,
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.error) {
          console.log(
            "There was error while attempting to retrieve tweets for timeline"
          );
        } else {
          setposts(res.data);
        }
      });
  };
  useEffect(() => {
    getposts();
    axios
      .get(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${id}/me`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Error");
        } else {
          setDarkMode(res.data.darkMode);
        }
      });
  }, [id]);
  const [selectedImage, setSelectedImage] = useState(null);
  function onimgSelectedChange(newimg) {
    setSelectedImage(newimg);
    console.log(selectedImage);
  }
  const passdeletedTweet = (id) => {
    if(props.isAdmin)
    {
      axios
      .delete(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/tweet/${id}`,
        { headers: { Authorization: admintoken } }
      )
      .then((res) => {
        console.log(res);
        if (res.error || !res.data === "success") {
          alert("something went wrong");
        } else {
          getposts();
          window.location.reload();
          window.location.reload();
        }
      })
      .catch((err) => {
        //err.message; // 'Oops!'
        alert("Error occured while deleting");
        console.log(err);
      });
    }
    else
    {
      axios
        .delete(
          `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/tweet/${id}`,
          { headers: { Authorization: token } }
        )
        .then((res) => {
          console.log(res);
          if (res.error || !res.data === "success") {
            alert("something went wrong");
          } else {
            getposts();
            window.location.reload();
            window.location.reload();
          }
        })
        .catch((err) => {
          //err.message; // 'Oops!'
          alert("Error occured while deleting");
          console.log(err);
        });
    }
  };
  const postHandeler = () => {
    if (text != "" || selectedImage) {
      let data = {
        authorId: localStorage.getItem("userId"),
        text: text,
        gallery: [],
      };
      if (text === "") {
        data.text = "No-text";
      }
      if (selectedImage) {
        data.gallery.push({ photo: selectedImage });
      }
      let data2 = new FormData();
      data2.append("authorId", data.authorId);
      data2.append("text", data.text);
      data2.append("image", selectedImage);
      data2.append("imageCheck", "true");
      let x = localStorage.getItem("accessToken");
      console.log(data);
      console.log(data2);
      axios
        .post(
          `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/tweet`,
          data2,
          { headers: { Authorization: localStorage.getItem("accessToken") } }
        )
        .then((res) => {
          console.log(res);
          if (res.error) {
            alert("something went wrong");
          } else {
            getposts();
            window.location.reload();
            window.location.reload();
          }
        })
        .catch((err) => {
          //err.message; // 'Oops!'
          alert(err.response.data.error);
          console.log(err);
        });

      setText("");
      setSelectedImage();
    }
  };
  console.log(posts);
  const onChangeHandeler = (event) => {
    setText(event.target.value);
  };
  return (
    <div className="Homepage">
      <SideBar Home isAdmin={props.isAdmin} darkMode={darkMode} />
      <div className="postConatiner">
        <Header />
        <Tweet
          value={text}
          onChangeHandeler={onChangeHandeler}
          ali={selectedImage}
        />
        <TweetBar
          postHandeler={postHandeler}
          onimgChange={onimgSelectedChange}
        />
        {posts.length ? (
          posts.map((post) => (
            <Post
              post={post}
              passdeletedTweet={passdeletedTweet}
              isAdmin={props.isAdmin}
              isPost={true}
            />
          ))
        ) : (<></>)}
      </div>
      <div className="rightbar">
        <div className="searchbar">
          <Searchbar />
        </div>
      </div>
    </div>
  );
}
export default Homepage;