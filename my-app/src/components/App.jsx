import React, { useState } from "react";

import './Styles/App.css'
import SideBar from "./SideBar";
import MyProfile from "./MyProfile";

function App() {
  return (
    <div className="App">
    <SideBar />
    <MyProfile />
    </div>
  );
}

export default App;
