import React, { useState,useEffect } from 'react';
import SettingsMenuOptions from './SettingsMenuOptions';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import "./Styles/SettingsMenu.css"
import ChangeNotificationsSettings from './ChangeNotificationsSettings';
import axios from 'axios';
/**
 * component to let the user change the notification settings
 * @component
 * @param {boolean} isDarkMode
 * @example
 * props.isDarkMode = true
 * return (
 * <div>
 *    <h1>Notifications prefrences</h1>
 *    <p>Select your preferences by notification type.</p>
 *    <SettingsMenuOptions "Push notification"/>
 *    ...
 * </div>
 * )
 *  
 */
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
     //related to request to back end
     const userId=localStorage.getItem("userId");
     // request data from backend
     const [profileData, setProfileData]=useState([]);
     const [ready, setReady]=useState(false);
     useEffect(()=>{
         // console.log(localStorage.getItem("accessToken"));
         axios.get(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userId}/me`, 
             { headers: {
                 Authorization: localStorage.getItem("accessToken")}
             }
         ).then((res)=>{
             
             if(res.data.error){
                 
             }
             else{
                 setProfileData(res.data)
                 setReady(true);
             }
         })
         
     }, [])
    return ( 
        <div className="settingsSubMenu">
            {/* if nothing clicked */}
                {!isClickedPushNotification &&<h1 className={!props.isDarkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Notifications prefrences</h1>}
                {!isClickedPushNotification &&<p className={!props.isDarkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" }>Select your notification preferences.<a className='App-link' href="https://help.twitter.com/en/managing-your-account/notifications-on-mobile-devices">Learnmore</a></p>}
                {!isClickedPushNotification &&<div onClick={clickedPushNotification} ><SettingsMenuOptions id="8" darkMode={props.isDarkMode} active={isClickedPushNotification} Icon={NotificationsIcon} text="Push notification"/></div>}
            {/* if clicked push notification */}
                {isClickedPushNotification && ready &&(<ChangeNotificationsSettings darkMode={props.isDarkMode} profileData={profileData}/>)}
            {/* <div onClick={clickedEmailNotification} ><SettingsMenuOptions id="9" darkMode={props.isDarkMode} Icon={EmailIcon} active={isClickedEmailNotification}  text="Email notification" /></div> */}
        </div>
     );
}

export default NotificationSettings;