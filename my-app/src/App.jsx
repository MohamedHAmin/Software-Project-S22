import React, { useState }  from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './components/Homepage/Homepage';
import Login from './components/login/Login';
import Signup from './components/login/Signup'
import './components/Homepage/Styles/Homepage.css';
import ProfilePage from './components/Profile/ProfilePage';
import SettingsPage from'./components/settings/SettingsPage';
function App() {
  // dark mode var and its functions used to identify the state od display :Light or Dark
  const [DarkMode,setDarkMode]=useState(false);
  function handleChangeDisplayMode(){
    setDarkMode(!DarkMode);
  }
  function onDisplayDarkModeChange() {  handleChangeDisplayMode();}
  return (
    <div>   
{/* Routing from Nav bar in login main screen*/}
      <BrowserRouter>
        <div className='App'>
          <Routes>
            <Route exact path="/" element={<Login />} ></Route>
            <Route path="/SignUp" element={<Signup />} ></Route>
          </Routes>
        </div>
      </BrowserRouter>

{/* Routing from Sidebar to all possible options */}
      <div className={DarkMode===false? "AppLight":"AppDark"}>
        <BrowserRouter>
          
            <Routes>
              <Route path="/Home" element={<Homepage />} ></Route>
              <Route path="/Settings" element={<SettingsPage isDark={DarkMode} onDarkModeChange={onDisplayDarkModeChange}/>} ></Route>
              <Route path="/Profile" element={<ProfilePage />} ></Route>
              <Route path="/Logout" element={<Login />} ></Route>
            </Routes>
          
        </BrowserRouter> 
      </div>  
    </div>  
  );
}
export default App;
