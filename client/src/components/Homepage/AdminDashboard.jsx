import React, { useEffect, useState } from "react";
import "../Profile/Styles/MyFollowing.css";
import axios from "axios";
import "./Styles/AdminDashboard.css";
import SideBar from "../Profile/SideBar";
import { Button } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Post from "./Post";
/**
 * component to show the Admin user the statistics of the application. 
 * @component
 * @param {boolean} newnotifications
 * @example
 * props.newnotifications = false
 * return (
 * <div>
 *      <h2> Larry statistics</h2>
 *      <Button>Week</Button>
 *      <Button>Month</Button>  
 *      <span>current</span>
 *      <span>past</span>
 *      <span>Lars</span> 
 *      <span>{currentNumNewUsers}</span>
 *      ...
 *   
 * </div>
 * )
 *  
 */
function AdminDashboard(props) {
  let userID = localStorage.getItem("userId");
  const [darkMode, setDarkMode] = useState(false);
  //vars for information displayed for admin
  const [currentNumTweets, setCurrentNumTweets] = useState(206);
  const [pastNumTweets, setPastNumTweets] = useState(189);
  const [currentNumComments, setCurrentNumComments] = useState(78);
  const [pastNumComments, setPastNumComments] = useState(84);
  const [currentNumNewUsers, setCurrentNumNewUsers] = useState(9);
  const [pastNumNewUsers, setPastNumNewUsers] = useState(6);
  const [currentNumRetweets, setCurrentNumRetweets] = useState(5);
  const [pastNumRetweets, setPastNumRetweets] = useState(5);
  const [currentNumReports, setCurrentNumReports] = useState(8);
  const [pastNumReports, setPastNumReports] = useState(10);
  //vars for calculating percentages
  const [tweetsPercentage, setTweetsPercentage] = useState(0);
  const [commentsPercentage, setCommentsPercentage] = useState(0);
  const [newUsersPercentage, setNewUsersPercentage] = useState(0);
  const [retweetsPercentage, setRetweetsPercentage] = useState(0);
  const [reportsPercentage, setReportsPercentage] = useState(0);
  //to check what is the duration the user wants
  const [duration, setDuration] = useState(7); //7 means week, 30 means month
  const [durationText, setDurationText] = useState("Week"); //7 means week, 30 means month
  const [topTweet, setTopTweet] = useState([]);
  const [toppTweet, setToppTweet] = useState();
  const [ready, setReady] = useState(false);

  const handleClickWeek = () => {
    setDuration(7);
    setDurationText("Week");
  };
  const handleClickMonth = () => {
    setDuration(30);
    setDurationText("Month");
  };

  useEffect(() => {
    //to get the display mode for the side bar
    axios
      .get(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userID}/me`,
        {
          headers: { Authorization: localStorage.getItem("accessToken") },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Error");
        } else {
          setDarkMode(res.data.darkMode);
        }
      });
    //retrieve statistics from backend
    axios
      .get(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/admin/dashboard?duration=${durationText}`,
        {
          headers: { Authorization: localStorage.getItem("adminToken") },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Error");
        } else {
          console.log(res.data);
          //set current info
          setCurrentNumReports(res.data.Current.reportsCount);
          setCurrentNumRetweets(res.data.Current.retweetCount);
          setCurrentNumNewUsers(res.data.Current.usersCount);
          setCurrentNumComments(res.data.Current.replyCount);
          setCurrentNumTweets(res.data.Current.tweetCount);
          //set past info
          setPastNumReports(res.data.Past.reportsCount);
          setPastNumRetweets(res.data.Past.retweetCount);
          setPastNumNewUsers(res.data.Past.usersCount);
          setPastNumComments(res.data.Past.replyCount);
          setPastNumTweets(res.data.Past.tweetCount);
          setTopTweet(res.data.TopTweet);
          //calculate percentages
          setTweetsPercentage(
            (
              (Math.abs(
                res.data.Current.tweetCount - res.data.Past.tweetCount
              ) /
                res.data.Current.tweetCount) *
              100
            ).toFixed(2)
          );
          setCommentsPercentage(
            (
              (Math.abs(
                res.data.Current.replyCount - res.data.Past.replyCount
              ) /
                res.data.Current.replyCount) *
              100
            ).toFixed(2)
          );
          setNewUsersPercentage(
            (
              (Math.abs(
                res.data.Current.usersCount - res.data.Past.usersCount
              ) /
                res.data.Current.usersCount) *
              100
            ).toFixed(2)
          );
          setRetweetsPercentage(
            (
              (Math.abs(
                res.data.Current.retweetCount - res.data.Past.retweetCount
              ) /
                res.data.Current.retweetCount) *
              100
            ).toFixed(2)
          );
          setReportsPercentage(
            (
              (Math.abs(
                res.data.Current.reportsCount - res.data.Past.reportsCount
              ) /
                res.data.Current.reportsCount) *
              100
            ).toFixed(2)
          );
          //get top tweet
          console.log(res.data.TopTweet._id);
          axios
            .get(
              `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/tweet/${res.data.TopTweet._id}`,
              {
                headers: { Authorization: localStorage.getItem("accessToken") },
              }
            )
            .then((res) => {
              if (res.error) {
                console.log(
                  "There was error while attempting to retrieve tweet"
                );
              } else {
                console.log(res.data);
                setToppTweet(res.data);
                setReady(true);
              }
            });
        }
      });
  }, [duration]);
  const passdeletedTweet = () => {
    axios
      .delete(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/tweet/${toppTweet._id}`,
        {
          headers: { Authorization: localStorage.getItem("adminToken") },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.error || !res.data === "success") {
          alert("something went wrong");
        } else {
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

  return (
    <div className="AdminDashboardPage">
      <SideBar Dashboard isAdmin={true} darkMode={darkMode} newnotifications={props.newnotifications}/>
      <div className="AdminDashboardWholeContainer">
        <h2 className="DashboardHeader"> Larry statistics</h2>
        <h3 className="DashboardParagraph">
          Larry provides insights to help you understand the Larry community as
          a whole.
        </h3>
        <h4 className="DashboardParagraph">
          Use this data to optimize your future Larry campaigns and get better
          results.
        </h4>
        <div className="UsersActivity">
          <div className="DashboardTextSubtext">
            <h4 className="DashboardHeader">Users activity</h4>
            <div className="DashboardParagraph">
              {duration} day summary with change over previous period
            </div>
          </div>
          <div className="ButtonsDuration">
            <Button
              onClick={handleClickWeek}
              className={
                duration === 7
                  ? "buttonDurationActive"
                  : "buttonDurationStyling"
              }
            >
              Week
            </Button>
            <Button
              onClick={handleClickMonth}
              className={
                duration === 30
                  ? "buttonDurationActive"
                  : "buttonDurationStyling"
              }
            >
              Month
            </Button>
          </div>
        </div>
        <div className="DashboardCountsContainer">
          <div className="PastCurrentdispflex">
            <div className="PastCurrentdisp">
              <span className="CountBoxSubHeader">current</span>
            </div>
            <div className="PastCurrentdisp">
              <span className="CountBoxSubHeader">past</span>
            </div>
          </div>
          <div className="CountBox">
            <h3 className="CountBoxHeader">Users</h3>
            <div className="CurrentDurationInfo">
              <span className="CountBoxNumbers">{currentNumNewUsers}</span>
              {currentNumNewUsers !== pastNumNewUsers ? (
                currentNumNewUsers > pastNumNewUsers ? (
                  <div className="WrapPercentArrowUp">
                    <span className="ArrowUpDownStyling">
                      <ArrowUpwardIcon />
                    </span>
                    <span className="PercentUpDownStyling">
                      {newUsersPercentage}%
                    </span>
                  </div>
                ) : (
                  <div className="WrapPercentArrowDown">
                    <span className="ArrowUpDownStyling">
                      <ArrowDownwardIcon />
                    </span>
                    <span className="PercentUpDownStyling">
                      {newUsersPercentage}%
                    </span>
                  </div>
                )
              ) : (
                <div className="Nochange">No change</div>
              )}
            </div>
            <div className="PastDurationInfo">
              <span className="CountBoxNumbers">{pastNumNewUsers}</span>
            </div>
          </div>
          <div className="CountBox">
            <h3 className="CountBoxHeader">Lars</h3>
            <div className="CurrentDurationInfo">
              <span className="CountBoxNumbers">{currentNumTweets}</span>
              {currentNumTweets !== pastNumTweets ? (
                currentNumTweets > pastNumTweets ? (
                  <div className="WrapPercentArrowUp">
                    <span className="ArrowUpDownStyling">
                      <ArrowUpwardIcon />
                    </span>
                    <span className="PercentUpDownStyling">
                      {tweetsPercentage}%
                    </span>
                  </div>
                ) : (
                  <div className="WrapPercentArrowDown">
                    <span className="ArrowUpDownStyling">
                      <ArrowDownwardIcon />
                    </span>
                    <span className="PercentUpDownStyling">
                      {tweetsPercentage}%
                    </span>
                  </div>
                )
              ) : (
                <div className="Nochange">No change</div>
              )}
            </div>
            <div className="PastDurationInfo">
              <span className="CountBoxNumbers">{pastNumTweets}</span>
            </div>
          </div>
          <div className="CountBox">
            <h3 className="CountBoxHeader">Comments</h3>
            <div className="CurrentDurationInfo">
              <span className="CountBoxNumbers">{currentNumComments}</span>
              {currentNumComments !== pastNumComments ? (
                currentNumComments > pastNumComments ? (
                  <div className="WrapPercentArrowUp">
                    <span className="ArrowUpDownStyling">
                      <ArrowUpwardIcon />
                    </span>
                    <span className="PercentUpDownStyling">
                      {commentsPercentage}%
                    </span>
                  </div>
                ) : (
                  <div className="WrapPercentArrowDown">
                    <span className="ArrowUpDownStyling">
                      <ArrowDownwardIcon />
                    </span>
                    <span className="PercentUpDownStyling">
                      {commentsPercentage}%
                    </span>
                  </div>
                )
              ) : (
                <div className="Nochange">No change</div>
              )}
            </div>
            <div className="PastDurationInfo">
              <span className="CountBoxNumbers">{pastNumComments}</span>
            </div>
          </div>
          <div className="CountBox">
            <h3 className="CountBoxHeader">ReLars</h3>
            <div className="CurrentDurationInfo">
              <span className="CountBoxNumbers">{currentNumRetweets}</span>
              {currentNumRetweets !== pastNumRetweets ? (
                currentNumRetweets > pastNumRetweets ? (
                  <div className="WrapPercentArrowUp">
                    <span className="ArrowUpDownStyling">
                      <ArrowUpwardIcon />
                    </span>
                    <span className="PercentUpDownStyling">
                      {retweetsPercentage}%
                    </span>
                  </div>
                ) : (
                  <div className="WrapPercentArrowDown">
                    <span className="ArrowUpDownStyling">
                      <ArrowDownwardIcon />
                    </span>
                    <span className="PercentUpDownStyling">
                      {retweetsPercentage}%
                    </span>
                  </div>
                )
              ) : (
                <div className="Nochange">No change</div>
              )}
            </div>
            <div className="PastDurationInfo">
              <span className="CountBoxNumbers">{pastNumRetweets}</span>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 30 }}>
          <div style={{ display: "flex" }}>
            <div className="TopLarConatiner">
              <h4 className="DashboardHeader">Top lar</h4>
              <div>
                {ready ? (
                  <Post
                    post={toppTweet}
                    passdeletedTweet={passdeletedTweet}
                    isAdmin={true}
                    isPost={true}
                    canviewcomments={false}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="CountBox">
              <div className="ReportsConatiner">
                <h3 className="CountBoxHeader">Reports</h3>
                <div className="CurrentDurationInfo">
                  <span className="CountBoxNumbers">{currentNumReports}</span>
                  {currentNumReports !== pastNumReports ? (
                    currentNumReports > pastNumReports ? (
                      <div className="WrapPercentArrowUp">
                        <span className="ArrowUpDownStyling">
                          <ArrowUpwardIcon />
                        </span>
                        <span className="PercentUpDownStyling">
                          {reportsPercentage}%
                        </span>
                      </div>
                    ) : (
                      <div className="WrapPercentArrowDown">
                        <span className="ArrowUpDownStyling">
                          <ArrowDownwardIcon />
                        </span>
                        <span className="PercentUpDownStyling">
                          {reportsPercentage}%
                        </span>
                      </div>
                    )
                  ) : (
                    <div className="Nochange">No change</div>
                  )}
                </div>
                <div className="PastDurationInfo">
                  <span className="CountBoxNumbers">{pastNumReports}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rightbarSearch"></div>
    </div>
  );
}

export default AdminDashboard;
