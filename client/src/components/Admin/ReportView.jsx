import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Post from "../Homepage/Post";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import "./Styles/ReportView.css"
import RetweetDisplayBlock from "../Homepage/RetweetDisplayBlock";
function ReportsView(props)
{
    return(
        <React.Fragment>
            <div className="ReportsView">
                <Button variant="outlined" color="error" className="DeleteReport" onClick={props.ondeletereport}>Delete</Button>
                <Stack spacing={2} direction="row" alignItems="baseline">
                    <h6>Reported by:</h6>
                    <NavLink className="tag" to='/Profile' >@tagname</NavLink>
                    {/* <Stack direction="column" alignItems="flex-end">
                        <p>trial</p>
                    </Stack> */}
                </Stack>
                <Stack spacing={2} direction="row" alignItems="baseline">
                    <h6>Report Reason:</h6>
                    <div>{props.reason}</div>
                </Stack>
                <Stack spacing={2} direction="row" alignItems="baseline">
                    <h6>Number Of Reports:</h6>
                    <div>{props.times}</div>
                </Stack>
                {props.info && <Stack spacing={2} direction="row" alignItems="baseline">
                    <h6>Additional Info:</h6>
                    <div>{props.info}</div>
                </Stack>}
                {props.isTweet && <div className="reportedtweet">
                     <Post
                        postid={0}
                        numberOfRetweets="0"
                        username='AhmedEmad'
                        tagName="Ahmed_Emad81"
                        content="Trial tweet"
                        hour="{post.posthour}"
                        date="{post.postdate}"
                        isPost={true}/>
                </div>}
                {!props.isTweet && <RetweetDisplayBlock 
                    username='AhmedEmad'
                    tagName="Ahmed_Emad81"/>}
            </div>
        </React.Fragment>
    );
}
export default ReportsView;