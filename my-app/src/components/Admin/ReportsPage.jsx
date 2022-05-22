import React, { useState,useEffect } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SideBar from './../Profile/SideBar';
import ReportsView from './ReportView';
import axios from 'axios'
import "./Styles/ReportsPage.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import { FallingLines } from "react-loader-spinner";
/**
 * reports page for the admin view where it displays by default when first opened a list of reported tweets and then admin can toggle between two options (reprted tweets and reported users)
 * it displays the reported tweets/users and indicates the total number of reports on each one 
 * delete button deletes all reports on the reported tweet/user present in the database
 * if the tweet contains an offending content onclick on three dots present inside the tweet th admin can delete the meant post
 * if the user have high number of reports the admin can go to his profile and ban the meant user for X period
 * the tweets or users are displayed descendingly according to the number of reports 
 * @param {boolean} isAdmin passed from the App.jsx to all components to be passed to the sidebar and used if needed in component
 * @returns {div}
 */
function ReportsPage(props)
{
    const [userReports,setuserReports]=useState([]);
    const [tweetReports,settweetReports]=useState([]);
    const [skiptweet,setskiptweet]=useState(1);
    const [skipuser,setskipuser]=useState(1);
    const [hasmoretweets,sethasmoretweets]=useState(true);
    const [hasmoreusers,sethasmoreusers]=useState(true);
    console.log(tweetReports);
    
    const gettweets=()=>{
      axios.get(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/admin/tweets/${skiptweet}?perPage=2`,{headers: {Authorization: localStorage.getItem("adminToken")}}).then((res)=>{
      console.log(res);
      if (res.error){console.log("Error")}
      else {
        var prevtweets=tweetReports;
        setskiptweet(skiptweet+1);
        var currenttweets=[...prevtweets,...res.data.tweets];
        settweetReports(currenttweets);
        if(currenttweets.filter((tweet)=>tweet.Reports===0).length)
        {
          sethasmoretweets(false);
        }
      }
    });
    }
    
    const getusers=()=>{
      axios.get(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/admin/users/${skipuser}?perPage=3`,{headers: {Authorization: localStorage.getItem("adminToken")}}).then((res)=>{
      console.log(res);
      if (res.error){console.log("Error")}
      else {
        var prevusers=userReports;
        setskipuser(skipuser+1);
        var currentusers=[...prevusers,...res.data.users];
        setuserReports(currentusers);
        if(currentusers.filter((user)=>user.Reports===0).length)
        {
          sethasmoreusers(false);
        }
      }
    });
    }

    useEffect(()=>{
      gettweets();
      getusers();
    },[])

    const fetchMoreData=()=>
    {
        gettweets();
    }

    const fetchMoreDataUsers=()=>{
      getusers();
    }

    const passdeletedTweet = (id) => {
        axios
          .delete(
            `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/tweet/${id}`,
            { headers: { Authorization: localStorage.getItem("adminToken") } }
          )
          .then((res) => {
            console.log(res);
            if (res.error || !res.data === "success") {
              alert("something went wrong");
            } else {
              gettweets();
              window.location.reload();
            }
          })
          .catch((err) => {
            //err.message; // 'Oops!'
            alert("Error occured while deleting");
            console.log(err);
          });
      };

      const ondeleteuserreport = (id) => {
        axios
          .delete(
            `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/admin/report/${id}?IDType=Reported`,
            { headers: { Authorization: localStorage.getItem("adminToken") } }
          )
          .then((res) => {
            console.log(res);
            if (res.error || !res.data === "success") {
              alert("something went wrong");
            } else {
              getusers();
              window.location.reload();
            }
          })
          .catch((err) => {
            //err.message; // 'Oops!'
            alert("Error occured while deleting");
            console.log(err);
          });
      };

      const ondeletetweetreport = (id) => {
        axios
          .delete(
            `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/admin/report/${id}?IDType=Reported`,
            { headers: { Authorization: localStorage.getItem("adminToken") } }
          )
          .then((res) => {
            console.log(res);
            if (res.error || !res.data === "success") {
              alert("something went wrong");
            } else {
              gettweets();
              window.location.reload();
            }
            //retweetCount();
          })
          .catch((err) => {
            //err.message; // 'Oops!'
            alert("Error occured while deleting");
            console.log(err);
          });
      };

    const [clicked,setClicked]=useState(true);
    const clickHandler=()=>
    {
        if(!clicked)
        {
            setClicked(true);
        }
    }
    const click2Handler=()=>
    {
        setClicked(false);
    }
    return(
        <React.Fragment>
            <div className="ReportsPage">
                <SideBar Reports isAdmin={props.isAdmin} newnotifications={props.newnotifications}/>
                <div className="ReportsContainer">
                    <Stack direction="row">
                        <Button variant="text" onClick={clickHandler}>Reported Tweets</Button>
                        <Button variant="text" onClick={click2Handler}>Reported Profiles</Button>
                    </Stack>

                    {/* {clicked && tweetReports.length? (
                        tweetReports.map((tweet)=>
                        {
                            </>
                        })
                    )} */}
                    {clicked && <InfiniteScroll
                      dataLength={tweetReports.length} 
                      next={fetchMoreData}
                      hasMore={hasmoretweets}
                      loader={<h4>Loading...</h4>}
                      endMessage={<></>}
                      >
                    {(clicked && tweetReports.length) ? ( 
                      tweetReports.filter((tweet)=> tweet.Reports!==0).map((tweet) =>
                      <ReportsView
                                ondelete={ondeletetweetreport}
                                times={tweet.Reports}
                                passdeletedTweet={passdeletedTweet}
                                isTweet={true}
                                tweet={tweet}/>)
                    ):(
                        <></>
                    )}
                    </InfiniteScroll>}
                    {!clicked && <InfiniteScroll
                      dataLength={userReports.length} 
                      next={fetchMoreDataUsers}
                      hasMore={hasmoreusers}
                      loader={<h4>Loading...</h4>}
                      endMessage={<></>}
                    >
                    {(!clicked && userReports.length) ? (
                    userReports.filter((user)=> user.Reports!==0).map((user) =>
                    <ReportsView
                        ondelete={ondeleteuserreport}
                        times={user.Reports}
                        isTweet={false}
                        user={user}/>)
                    ):(
                        <></>
                    )}
                    </InfiniteScroll>}
                </div>
                <div className="Notificationrightbar"></div>
            </div>
        </React.Fragment>
    );
}
export default ReportsPage;