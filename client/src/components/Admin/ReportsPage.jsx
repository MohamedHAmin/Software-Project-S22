import React, { useState,useEffect } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SideBar from './../Profile/SideBar';
import ReportsView from './ReportView';
import axios from 'axios'
import "./Styles/ReportsPage.css";
function ReportsPage(props)
{
    const [userReports,setuserReports]=useState([]);
    const [tweetReports,settweetReports]=useState([]);
    useEffect(()=>{
        axios.get(`http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/admin/tweets/1?perPage=5`,{headers: {Authorization: localStorage.getItem("adminToken")}}).then((res)=>{
        console.log(res);
        if (res.error){console.log("Error")}
        else {
          settweetReports(res.data);
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
                    {/*clicked && tweetReports?.length ? ( 
                        tweetReports.map((tweet) =>
                            <ReportsView
                                times={tweet.Reports}
                                reporter={tweet.authorId}
                                isTweet={true}
                                tweet={tweet}/>)
                    ):(<></>)*/}
                    {/*!clicked && <ReportsView reason="spam" times="5" info="trial" isTweet={false}/>*/}
                </div>
            </div>
        </React.Fragment>
    );
}
export default ReportsPage;