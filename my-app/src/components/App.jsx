import React, { useState } from "react";

import './Styles/App.css'
import SideBar from "./SideBar";
import MyProfile from "./MyProfile";
import Header from "./Header";
import Tweet from "./tweet"
function App() {
  return (
    <div className="App">
    <SideBar />
    {/* <MyProfile /> */}
    <Header />
    <Tweet />
    </div>
  );
}

export default App;
