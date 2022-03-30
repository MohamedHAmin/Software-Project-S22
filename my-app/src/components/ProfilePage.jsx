import React from "react";

import './Styles/ProfilePage.css'
import SideBar from "./SideBar";
import MyProfile from "./MyProfile";

function App() {
  return (
    <div className="App">
    <SideBar Profile />
    <MyProfile />
    </div>
  );
}

export default App;
