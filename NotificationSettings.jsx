import React, { useState } from 'react';
import SettingsMenuOptions from './SettingsMenuOptions';
import './Styles/SubMenu.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import "./Styles/SettingsMenu.css"
function NotificationSettings(props) {
    const [isClickedPushNotification,setPushNotificationActive]=useState(false);
    const [isClickedEmailNotification,setEmailNotificationActive]=useState(false);
    function clickedPushNotification(){
        setPushNotificationActive(true);
        setEmailNotificationActive(false);        
    }
    function clickedEmailNotification(){
        setPushNotificationActive(false);
        setEmailNotificationActive(true);        
    }
    return ( 
        <div className="settingsMenu">
        <h1 className={!props.isDarkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Notifications prefrences</h1>
        <p className={!props.isDarkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" }>Select your preferences by notification type.<a className='App-link' href="https://help.twitter.com/en/managing-your-account/notifications-on-mobile-devices">Learnmore</a></p>
        <div onClick={clickedPushNotification} ><SettingsMenuOptions id="8" darkMode={props.isDarkMode} active={isClickedPushNotification} Icon={NotificationsIcon} text="Push notification"/></div>
        <div onClick={clickedEmailNotification} ><SettingsMenuOptions id="9" darkMode={props.isDarkMode} Icon={EmailIcon} active={isClickedEmailNotification}  text="Email notification" /></div>
        
        </div>

     );
}

export default NotificationSettings;