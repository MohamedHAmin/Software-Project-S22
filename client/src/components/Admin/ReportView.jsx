import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import Post from "../Homepage/Post";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./Styles/ReportView.css"
import RetweetDisplayBlock from "../Homepage/RetweetDisplayBlock";
/**
 * reusable component used to display tweet reports as well as user reports
 * @param {number} times number of reports on a certain user or tweet
 * @param {boolean} isTweet indicated whether this report is on a tweet or user
 * @param {object} tweet an object that contains all the needed details about the reported tweet
 * @param {object} user an object that contains all the needed details about the reported user
 * @param {object} passdeletedTweet takes the id of the tweet to be deleted from the child and pass it to the parent (reportspage) to call BE
 * @param {object} ondelete passes the id of the tweet or user to delete all reports on the meant user or tweet
 * @returns {div}
 *          <ReportsView
            ondelete={ondeletetweetreport}
            times={tweet.Reports}
            passdeletedTweet={passdeletedTweet}
            isTweet={true}
            tweet={tweet}/>
            <ReportsView
            ondelete={ondeleteuserreport}
            times={user.Reports}
            isTweet={false}
            user={user}/>
 */
function ReportsView(props)
{
    function ondeletereport()
    {
        if(props.tweet)
        {
            props.ondelete(props.tweet._id);
        }
        else
        {
            props.ondelete(props.user._id);
        }
    }
    /*const [tmppost,settmppost]=useState([]);
    useEffect(()=>
    {
        let post=[{
            _id:props.tweet._id,
            retweetCount:props.tweet.retweetCount,
            replyCount:props.tweet.replyCount,
            likeCount:props.tweet.likeCount,
            authorId:{
                screenName:props.tweet.reporter.screenName,
                tag:props.tweet.reporter.tag,
                _id:props.tweet.reporter._id
            },   
            profileAvater:{
                url:props.tweet.reporter.profileAvater.url
            },
            text:props.tweet.text,
            gallery:props.tweet.gallery
        }]
        settmppost(post);
        console.log(tmppost);
    },[props.tweet._id])*/
    function passdeletedTweet(){   
        props.passdeletedTweet(props.tweet._id);
      }
    return(
        <React.Fragment>
            {props.times && <div className="ReportsView">
                <Button variant="outlined" color="error" className="DeleteReport" onClick={ondeletereport}>Delete</Button>
                {/*<Stack spacing={2} direction="row" alignItems="baseline">
                    <h6>Reported by:</h6>
                    <NavLink className="tag" to={`/Profile/${props.reporter._id}`} >{"@" + props.reporter.tag}</NavLink>
                    {/* <Stack direction="column" alignItems="flex-end">
                        <p>trial</p>
                    </Stack> */}
                {/*</Stack>*/}
                {props.reason && <Stack spacing={2} direction="row" alignItems="baseline">
                    <h6>Report Reason:</h6>
                    <div>{props.reason}</div>
                </Stack>}
                <Stack spacing={2} direction="row" alignItems="baseline">
                    <h6>Number Of Reports:</h6>
                    <div>{props.times}</div>
                </Stack>
                {props.info && <Stack spacing={2} direction="row" alignItems="baseline">
                    <h6>Additional Info:</h6>
                    <div>{props.info}</div>
                </Stack>}
                <br/>
                {props.isTweet && <div className="reportedtweet">
                     <Post
                        post={props.tweet}
                        passdeletedTweet={passdeletedTweet}
                        isAdmin={true}
                        isPost={true}/>
                </div>}
                {!props.isTweet && <RetweetDisplayBlock
                    key={props.user._id} 
                    authorId={props.user._id}
                    username={props.user.screenName}
                    tagName={props.user.tag}/>}
            </div>}
        </React.Fragment>
    );
}
export default ReportsView;