import React, { useState,useEffect } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SideBar from './../Profile/SideBar';
import ReportsView from './ReportView';
import axios from 'axios'
import "./Styles/ReportsPage.css";
import { FallingLines } from "react-loader-spinner";

function ReportsPage(props)
{
    const [userReports,setuserReports]=useState([]);
    const [tweetReports,settweetReports]=useState([]);
    console.log(tweetReports);
    useEffect(()=>{
        axios.get(`http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/admin/tweets/1?perPage=5`,{headers: {Authorization: localStorage.getItem("adminToken")}}).then((res)=>{
        console.log(res);
        if (res.error){console.log("Error")}
        else {
          settweetReports(res.data);
          console.log(tweetReports);
          console.log(res.data);
        }
    })
        axios.get(`http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/admin/users/1?perPage=5`,{headers: {Authorization: localStorage.getItem("adminToken")}}).then((res)=>{
        console.log(res);
        if (res.error){console.log("Error")}
        else {
          setuserReports(res.data);
        }
    })
    },[])

    const passdeletedTweet = (id) => {
        axios
          .delete(
            `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/tweet/${id}`,
            { headers: { Authorization: localStorage.getItem("adminToken") } }
          )
          .then((res) => {
            console.log(res);
            if (res.error || !res.data === "success") {
              alert("something went wrong");
            } else {
              window.location.reload();
              axios.get(`http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/admin/tweets/1?perPage=5`,{headers: {Authorization: localStorage.getItem("adminToken")}}).then((res)=>{
                console.log(res);
                if (res.error){console.log("Error")}
                else {
                    settweetReports(res.data);
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

      const ondeleteuserreport = (id) => {
        axios
          .delete(
            `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/admin/report/${id}?IDType=Reported`,
            { headers: { Authorization: localStorage.getItem("adminToken") } }
          )
          .then((res) => {
            console.log(res);
            if (res.error || !res.data === "success") {
              alert("something went wrong");
            } else {
              window.location.reload();
              axios.get(`http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/admin/users/1?perPage=5`,{headers: {Authorization: localStorage.getItem("adminToken")}}).then((res)=>{
                    console.log(res);
                    if (res.error){console.log("Error")}
                    else {
                    setuserReports(res.data);
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

      const ondeletetweetreport = (id) => {
        axios
          .delete(
            `http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/admin/report/${id}?IDType=Reported`,
            { headers: { Authorization: localStorage.getItem("adminToken") } }
          )
          .then((res) => {
            console.log(res);
            if (res.error || !res.data === "success") {
              alert("something went wrong");
            } else {
              window.location.reload();
              axios.get(`http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/admin/tweets/1?perPage=5`,{headers: {Authorization: localStorage.getItem("adminToken")}}).then((res)=>{
                console.log(res);
                if (res.error){console.log("Error")}
                else {
                    settweetReports(res.data);
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
                <SideBar Notifications isAdmin={props.isAdmin}/>
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
                    {(clicked && tweetReports.tweets) ? ( 
                        tweetReports.tweets.filter((tweet)=> tweet.Reports!==0).map((tweet) =>
                            <ReportsView
                                ondelete={ondeletetweetreport}
                                times={tweet.Reports}
                                passdeletedTweet={passdeletedTweet}
                                isTweet={true}
                                tweet={tweet}/>)
                    ):(
                        <></>
                    )}
                    {(!clicked && userReports.users) ? (
                    userReports.users.filter((user)=> user.Reports!==0).map((user) =>
                    <ReportsView
                        ondelete={ondeleteuserreport}
                        times={user.Reports}
                        isTweet={false}
                        user={user}/>)
                    ):(
                        <></>
                    )}
                </div>
            </div>
        </React.Fragment>
    );
}
export default ReportsPage;