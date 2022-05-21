import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";
import "./components/Homepage/Styles/Homepage.css";
import ProfilePage from "./components/Profile/ProfilePage";
import SettingsPage from "./components/settings/SettingsPage";
import Report from "./components/Homepage/Report";
import axios from "axios";
import ReportAction from "./components/Homepage/ReportAction";
import ReportsPage from "./components/Admin/ReportsPage";
import FollowingPage from "./components/Profile/FollowingPage";
import FollowersPage from "./components/Profile/FollowersPage";
import Notifications from "./components/Homepage/Notifications";
import Explore from "./components/Homepage/Explore";
import AdminDashboard from "./components/Homepage/AdminDashboard";
import SearchResults from "./components/Homepage/SearchResults";

function App() {
  //Login with Google
  const [user, setUser] = useState(null);
  const [newnotifications,setnewnotifications]=useState(false);

  useEffect(() => {
    const getUser = () => {
      fetch("http://localhost:5000/user/googlelogin/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  const checkfornewnotifications=()=>{
    if(localStorage.getItem("lastseennotifications") !== localStorage.getItem("currentnotifications"))
    {
      setnewnotifications(true);
    }
    else if(localStorage.getItem("lastseennotifications")===undefined)
    {
      setnewnotifications(true);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////

  // DUMMY VAR dark mode just to make useeffect work when clicked on changing mode
  const [DarkMode, setDarkMode] = useState(false);
  function handleChangeDisplayMode() {
    setDarkMode(!DarkMode);
  }

  //related to request to back end
  const userId = localStorage.getItem("userId");
  const [profileData, setProfileData] = useState([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    console.log(localStorage.getItem("accessToken"));
    axios
      .get(
        `http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userId}/me`,
        {
          headers: {
            Authorization: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((res) => {
        if (res.data.error) {
        } else {
          setProfileData(res.data);
          setReady(true);
        }
      });
  }, [DarkMode]);
  const [isAdmin, setisAdmin] = useState(false);
  function checkAdmin() {
    if (localStorage.getItem("adminToken") !== "") {
      setisAdmin(true);
      //console.log(isAdmin);
    }
  }
  return (
    <div>
      {/* Routing from Nav bar in login main screen*/}
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Login />}></Route>
            <Route path="/SignUp" element={<Signup />}></Route>
          </Routes>
        </div>
      </BrowserRouter>

      {/* Routing from Sidebar to all possible options */}
      <div
        className={profileData.darkMode === false ? "AppLight" : "AppDark"}
        onClick={checkfornewnotifications}
        onLoad={checkAdmin}
      >
        <BrowserRouter>
          <Routes>
            <Route
              path="/Home"
              element={<Homepage isAdmin={isAdmin} newnotifications={newnotifications} />}
            ></Route>
            <Route
              path="/Settings"
              element={
                <SettingsPage
                  isDark={profileData.darkMode}
                  onDarkModeChange={handleChangeDisplayMode}
                  isAdmin={isAdmin}
                  newnotifications={newnotifications}
                />
              }
            ></Route>
            <Route
              path="/Profile/:id"
              element={<ProfilePage isAdmin={isAdmin} newnotifications={newnotifications}/>}
            ></Route>
            <Route
              path="/Profile/:id/with_replies"
              element={<ProfilePage isAdmin={isAdmin} newnotifications={newnotifications}/>}
            ></Route>
            <Route
              path="/Profile/:id/media"
              element={<ProfilePage isAdmin={isAdmin} newnotifications={newnotifications}/>}
            ></Route>
            <Route
              path="/Profile/:id/likes"
              element={<ProfilePage isAdmin={isAdmin} newnotifications={newnotifications}/>}
            ></Route>
            <Route
              path="/Report/:reportType/:id"
              element={<Report isAdmin={isAdmin} newnotifications={newnotifications}/>}
            ></Route>
            <Route
              path="/ReportAction"
              element={<ReportAction isAdmin={isAdmin} newnotifications={newnotifications}/>}
            ></Route>
            <Route
              path="/Profile/:id/Following"
              element={<FollowingPage />}
            ></Route>
            <Route
              path="/Profile/:id/Followers"
              element={<FollowersPage />}
            ></Route>
            <Route path="/Logout" element={<Login />}></Route>
            <Route
              path="/ReportsPage"
              element={<ReportsPage isAdmin={isAdmin} newnotifications={newnotifications}/>}
            ></Route>
            <Route
              path="/search/:searchtext"
              element={<SearchResults isAdmin={isAdmin} newnotifications={newnotifications}/>}
            ></Route>
            <Route
              path="/Notifications"
              element={<Notifications isAdmin={isAdmin} newnotifications={false}/>}
            ></Route>
            <Route
              path="/Explore"
              element={<Explore isAdmin={isAdmin} newnotifications={newnotifications}/>}
            ></Route>
            <Route path="/Admin/Dashboard" element={<AdminDashboard newnotifications={newnotifications}/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
      {/*  */}
    </div>
  );
}
export default App;
