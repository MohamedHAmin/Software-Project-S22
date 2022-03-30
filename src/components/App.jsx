import React, {useRef,useEffect,useState,useCallback } from "react";
import './Styles/App.css'
import SideBar from "./SideBar";
import Tweet from "./Tweet";
import HomeBlock from './HomeBlock';

export default function App() 
{
  const count=0;
  const [tweetContent,setTweetContent]=useState("");
  const [newtweet,setNewTweet]=useState(false);
  const tweets=[
    {tweetContent:""},{tweetContent:""},{tweetContent:""},{tweetContent:""}
  ];
  const callback=useCallback((tweetContent,newtweet)=>{setTweetContent(tweetContent);setNewTweet(newtweet)},[]);

  if(newtweet)
  {
    
  };

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
              <div>
                <Tweet content={tweetContent}/>
              </div>
            </div>
          </div>

      </React.Fragment>
    );
}