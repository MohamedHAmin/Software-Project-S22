import React, { useState }  from 'react';
import './App.css';
import AccountSettings from './components/AccountSettings';
import SettingsMenu from './components/SettingsMenu';
import NotificationSettings from './components/NotificationSettings';
import DisplaySettings from './components/DisplaySettings';

function App() {
  // dark mode var and its functions used to identify the state od display :Light or Dark
  const [DarkMode,setDarkMode]=useState(false);
  function handleChangeDisplayMode(){
    setDarkMode(!DarkMode);
  }
  function onDisplayDarkModeChange() {  handleChangeDisplayMode();}
  //var Id settings option selected from settings menu and its functions
  const [idItemSelected,setIdItemSelected]=useState(1);
  
  function handleChangeIdSelected(id){
    setIdItemSelected(id);
  }
  function onItemSelectedChange(newid) {  handleChangeIdSelected(newid);}

  return (
    <div className={DarkMode===false? "AppLight":"AppDark"}>
      <h1>sidebar_____________</h1>
      {/* <MainCompOfSettings issDarkMode={DarkMode}/> */}
        <SettingsMenu isDarkMode={DarkMode}  onIdChange={onItemSelectedChange}/>
       
       {idItemSelected===1&&(<AccountSettings isDarkMode={DarkMode}/>) }
       
       {idItemSelected===4&&(<NotificationSettings isDarkMode={DarkMode}/>) }
       {idItemSelected===5&&(<DisplaySettings isDarkMode={DarkMode} onDarkModeChange={onDisplayDarkModeChange}/>) }
    </div>    
  );
  
}

export default App;
