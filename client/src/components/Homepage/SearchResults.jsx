import {React, useEffect, useState} from 'react';
import SideBar from "../Profile/SideBar";
import Post from './Post';
import Searchbar from "./Search";
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import SearchFollowers from '../Profile/SearchFollowers';
import "./Styles/SearchResults.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

function SearchResults(props) {
    const [darkMode, setDarkMode] = useState(false);
    const [resultTweets,setResultTweets]=useState([]); 
    const [resultUsers,setResultUsers]=useState([]); 
    const navigate = useNavigate();
    let searchKeyword = localStorage.getItem("searchKey");
    let { id } = useParams();
    let check = localStorage.getItem("check");
    if (check == 1)
    {
      localStorage.setItem("check",0);
      window.location.reload();
    }
    console.log(resultTweets);
    console.log(resultUsers);
    useEffect(() => {
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
    
    if (searchKeyword!="")
    {
        axios
        .get(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/search/${searchKeyword}`,
           {
               headers: { Authorization: localStorage.getItem("accessToken") },
           }
       )
       .then((res) => {
           console.log(res);
           setResultTweets(res.data.Tweets);
           setResultUsers(res.data.Users);
       }).catch(err => {
           alert(err.response.data.error);
       }
       );}
    },[searchKeyword])
    
    return (
  <div className="SearchResults">
    <SideBar Search isAdmin={props.isAdmin} darkMode={darkMode}/>
    <div className='resultsPage'>
    <div className="backAndSearchbar">
    <ArrowBackIcon className='arrowback' onClick={() => navigate(-1)} />
          <div className='AndSearchbar'><Searchbar /></div>
        </div>
    <div className='people'>
    <div className='titles'><h5>Users</h5></div>
    {
      resultUsers.map((follower) => (
        <SearchFollowers 
        key={follower._id}
        contact={follower}/>
      ))
    }

    </div>
    <div className='tweets'>
    <div className='titles'><h5>Tweets</h5></div>
    {resultTweets.length ? (
          resultTweets.map((post) => (
            <Post
              post={post}
              isAdmin={props.isAdmin}
              isPost={true}
            />
          ))
        ) : (<></>)}
    </div>
    </div>
    <div className="rightbar">

    </div>
  </div>);
}

export default SearchResults;