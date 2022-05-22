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
import InfiniteScroll from 'react-infinite-scroll-component';
import Stack from "@mui/material/Stack";

/**
 * Homepage containing area to post tweets and timeline tweets (your tweets and tweets of people you follow)
 * it also contains sidebar to navigate through pages and it also contains searchbar
 * @component 
 * @param {boolean} isAdmin indicates whether or not this home is an admin's home or a normal user's home
 * @returns {div}
 * @example
 *        <Homepage isAdmin={isAdmin}/>
 */
function Homepage(props) {
  const [posts, setposts] = useState([]);
  const [token,setToken]=useState(localStorage.getItem("accessToken"));
  const [admintoken,setAdminToken]=useState(localStorage.getItem("adminToken"));
  const [text, setText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [photos, setuploadphotos] = useState([]);
  const [skip,setskip]=useState(0);
  const [hasmore,sethasmore]=useState(true);
  const [at, setats] = useState([]);
  const [final, setfinal] = useState([]);
  const [finalfinal, setfinalfinal] = useState([]);
  const [notificationscount,setnotificationscount]=useState(0);

  console.log( "tags"+ finalfinal[0]);
  const [space, setspaces] = useState([]);
  let { id } = useParams();
  let { screenName } = useParams();
  const getposts = () => {
    axios
      .get(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/timeline?limit=2&skip=${skip}`,
        { headers: { Authorization: token } }
      )
      .then((res) => {
        if (res.error) {
          console.log(
            "There was error while attempting to retrieve tweets for timeline"
          );
        } else {
          var prevposts=posts;
          setskip(skip+2);
          //setposts(res.data);
          var currentposts=[...prevposts,...res.data];
          setposts(currentposts);
          if(prevposts.length===currentposts.length)
          {
            sethasmore(false);
          }
        }
      });
  };

  const fetchMoreData=()=>{
    getposts();
  }

  if(photos.length ===0){
  }
  else{
  
    // fileInput is an HTML input element: <input type="file" id="myfileinput" multiple>
    var fileInput = document.getElementById("icon-button-file");

    // files is a FileList object (similar to NodeList)
    var files = fileInput.files;
    var file;

    // loop through files
    for (var i = 0; i < files.length; i++) {

        // get item
        file = files.item(i);
        photos[i]=file
        // alert(photos[i].name);

    }
  }

  // useEffect(()=>{
  //   checkfornewnotifications();
  // },[])

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
    setuploadphotos(newimg);
    console.log(photos);
    console.log(photos.length);
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
    if (text != "" || photos.length) {
      let data = {
        authorId: localStorage.getItem("userId"),
        text: text,
        gallery: [],
      };
      if (text === "") {
        data.text = "No-text";
      }
      if (text != "") {


        let j=0;
        for (var i = 0; i < text.length; i++) {
      
          let d=text.slice(i,i+1);
          if(d==="@"){
            at[j]=i;
            j++;
          }
        
        }
        let q=0;
        for (var i = 0; i < text.length; i++) {
      
          let d=text.slice(i,i+1);
          if(d===" "){
            space[q]=i;
            q++;
          }
        
        }
        let r=0
        let w=0;
        for (var i = 0; i < space.length; i++) {
          // console.log(at[w]);
          // console.log(space[i]);
          if(space[i]===at[w]+1){
            w++;
          }
          if(space[i]>at[w]+1){
            // console.log(at[w]);
            // console.log(space[i]);
            // console.log(r);
            // console.log(w);
            final[r]=at[w];
            final[r+1]=space[i];
            // console.log(final[r]);
            // console.log(final[r+1]);
            // console.log(space[i]);
            // console.log(at[w]);
            w++;
            r+=2;
          }
        }
          let u=0;
        if(final.length!=0){
         
          for (var i = 0; i < final.length; i+=2) {
            // console.log(final[i]);
            // console.log(final[i+1]);
            let t=text.slice(final[i],final[i+1]);
            // console.log(t)
            finalfinal[u]=t;
            u++;
          }
        }
        // console.log(at[w]);
        // console.log(text.length);
      
        if(w<at.length){
          // let p=finalfinal.length
          let x=text.slice(at[w],text.length);
          // console.log(p);
          // console.log(finalfinal.length);
          finalfinal[w]=x;
          // console.log(finalfinal.length);
          // p=-2;
          // w++;
          // console.log("doneeeeeee");
        }
        if(finalfinal.length!=0){
          for (var i = 0; i < finalfinal.length; i++) {
            console.log(finalfinal[i]);
          }
        }
      }
      if (photos.length) {
        data.gallery.push({ photo: photos[0]});
      }
      let data2 = new FormData();
        //alert(photos.length);
        data2.append("authorId", data.authorId);
        data2.append("text", data.text);
        for(var i=0;i<photos.length;i++){
          data2.append("image", photos[i]);
        }
        // for(var i=0;i<finalfinal.length;i++){
          //   data2.append("tags", finalfinal[i]);
          // }
          if(photos.length)
          {
            data2.append("imageCheck", "true");
          }
        data2.append("tags", finalfinal[0]);
        //data2.append("tags", "1112122");
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
          alert(err.response.data.error);
          console.log(err);
        });

      setText("");
      setuploadphotos([]);
    }
  };
  // alert(id);
  console.log(posts);
  const onChangeHandeler = (event) => {
    setText(event.target.value);
  };
  return (
    <div className="Homepage">
      <SideBar Home isAdmin={props.isAdmin} darkMode={darkMode} newnotifications={props.newnotifications}/>
      <div className="postConatiner">
        <Header />
        <Tweet
          value={text}
          onChangeHandeler={onChangeHandeler}
          ali={photos}
        />
        <TweetBar
          postHandeler={postHandeler}
          onimgChange={onimgSelectedChange}
        />
        <InfiniteScroll
          dataLength={posts.length} 
          next={fetchMoreData}
          hasMore={hasmore}
          loader={<h4>Loading...</h4>}
          endMessage={<></>}
          >
        {posts.length ? (
          posts.map((post) => (
            <Post
            post={post}
            passdeletedTweet={passdeletedTweet}
            isAdmin={props.isAdmin}
            isPost={true}
            canviewcomments={true}
            />
            ))
            ) : (
              <Stack className="comments" direction="column">
                <Stack direction="row">
                  <p>No lars yet?</p>
                </Stack>
                <Stack direction="row">
                  <p>
                    Start following people, post lars, and
                    enjoy Larry!
                  </p>
                </Stack>
              </Stack>
            )}
          </InfiniteScroll>
      </div>
      <div className="rightbar">
        <div className="searchbar">
          <Searchbar viewSuggestedAccounts={true}/>
        </div>
      </div>
    </div>
  );
}
export default Homepage;