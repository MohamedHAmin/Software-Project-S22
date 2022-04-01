import React, {useRef,useEffect,useState,useCallback } from "react";
import './Styles/App.css'
import SideBar from "./SideBar";
import Tweet from "./Tweet";
import HomeBlock from './HomeBlock';
import Searchbar from "./Search";

export default function App() 
{
  const count=0;
  const [tweetContent,setTweetContent]=useState("");
  const [newtweet,setNewTweet]=useState(false);
  const [tweets,setTweets]=[{tweetContent:""}
  ];
  const callback=useCallback((tweetContent,newtweet)=>{setTweetContent(tweetContent);setNewTweet(newtweet)},[]);
  
  const tweetClicked=()=>
  {
    console.log("clicked");
    return (
      <Tweet content={tweetContent}/>
    );
  };
  //functional but renders the tweet in another page
  /*if(newtweet)
  {
    return (
      <Tweet content={tweetContent}/>
    );
  }*/
  /*if(newtweet)
  {
    const newtweets=[...tweets];
    newtweets[count]=tweetContent;
    setTweets(newtweets);
    count++;
    console.log(count);
  };*/

  /*const Component =({tweetContent})=>{
    const prev=useRef({tweetContent}).current;
    useEffect(()=>{
      if(prev.tweetContent !== tweetContent)
      {
        <Tweet content={tweetContent}/>
      }
      return()=>{
        prev.tweetContent=tweetContent;
      };
    },[tweetContent]);
  };*/
  return (
      <React.Fragment>
          <div className="App">
            <SideBar/>
            <div className="home">
              <div className="Block">
                <HomeBlock parentCallback={callback}/>
              </div>   
              <div>{newtweet==true && (<Tweet content={tweetContent}/>)}</div>
            </div>
            <div className="leftbar">
                  <div className="searchbar">
                      <Searchbar/>
                  </div>
            </div>
          </div>

      </React.Fragment>
    );
}