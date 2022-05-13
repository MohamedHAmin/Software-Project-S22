import React, { useState,useEffect } from 'react';
import "./Styles/SettingsMenuOptions.css"
import "./Styles/SettingsMenu.css"
import Checkbox from '@mui/material/Checkbox';
import "./Styles/SettingsModals.css"
import axios from 'axios'
import Switch from '@mui/material/Switch';
import SettingsMenuOptions from './SettingsMenuOptions';
import { Button } from '@mui/material';
/**
 * component to let the user change the notification settings
 * @component
 * @param {boolean} darkMode
 * @param {Array} profileData all the profile data of the user
 * @example
 * props.darkMode = true
 * props.profileData.Notificationssetting.newfollow = false
 * props.profileData.Notificationssetting.liketweet = false
 * props.profileData.Notificationssetting.newtweet = false
 * const checkedSwitch = false
 * return (
 * <div>
 *      <h1>Push notifications</h1>
 *      <Switch/>
 *      <h2>Turn on push notifications</h2> 
 *      <Button>Turn On</Button>       
 * </div>
 * )
 *  
 */

function ChangeNotificationsSettings(props) {
    //request to back end
    //related to request to back end
    const userId=localStorage.getItem("userId");
//for new follow
    const [checkedNewFollowers, setcheckedNewFollowers] = useState(props.profileData.Notificationssetting.newfollow);
    const labelNewFollowers = { inputProps: { 'aria-label': 'Checkbox demo' } };
    //for new like
    const [checkedLikes, setcheckedLikes] = useState(props.profileData.Notificationssetting.liketweet);
    const labelLikes = { inputProps: { 'aria-label': 'Checkbox demo' } };
    //for new tweet
    const [checkedNewTweet, setcheckedNewTweet] = useState(props.profileData.Notificationssetting.newtweet);
    const labelNewTweet = { inputProps: { 'aria-label': 'Checkbox demo' } };
    //for switch
    const [checkedSwitch, setcheckedSwitch] = useState((!props.profileData.Notificationssetting.newtweet&&!props.profileData.Notificationssetting.liketweet&&!props.profileData.Notificationssetting.newfollow)?false:true);
    const labelSwitch = { inputProps: { 'aria-label': 'Switch demo' } };
    const handleChangeNewFollowers = (event) => {
        
            //make request to back end here
            
            let data={
                Notificationssetting:{newfollow:!checkedNewFollowers,newtweet:checkedNewTweet,liketweet:checkedLikes}
            }
            axios.put(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userId}`,data, {

              headers: {
                Authorization: localStorage.getItem("accessToken")
              }
      
            }).then((res)=>{
                console.log(res);
                if(res.error){
                    alert("error nothing changed!")
                }
                else{
                    
                    setcheckedNewFollowers(!checkedNewFollowers);
                }
            })   
    };
    //for likes
    const handleChangeLikes = (event) => {
        
            //make request to back end here
            
            let data={
                Notificationssetting:{newfollow:checkedNewFollowers,newtweet:checkedNewTweet,liketweet:!checkedLikes}
            }
            axios.put(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userId}`,data, {

              headers: {
                Authorization: localStorage.getItem("accessToken")
              }
      
            }).then((res)=>{
                console.log(res);
                if(res.error){
                    alert("error nothing changed!")
                }
                else{
                    
                    setcheckedLikes(!checkedLikes);
                }
            })   
    };

    //for new tweet
    const handleChangeNewTweet = (event) => {
        
            //make request to back end here
            
            let data={
                Notificationssetting:{newfollow:checkedNewFollowers,newtweet:!checkedNewTweet,liketweet:checkedLikes}
            }
            axios.put(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userId}`,data, {

              headers: {
                Authorization: localStorage.getItem("accessToken")
              }
      
            }).then((res)=>{
                console.log(res);
                if(res.error){
                    alert("error nothing changed!")
                }
                else{
                    
                    setcheckedNewTweet(!checkedNewTweet);
                }
            })   
    };
    const handleChangeSwitch=()=>{
        //make request to back end here
            
        let data={
            Notificationssetting:{newfollow:!checkedSwitch,newtweet:!checkedSwitch,liketweet:!checkedSwitch}
        }
        axios.put(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userId}`,data, {

          headers: {
            Authorization: localStorage.getItem("accessToken")
          }
  
        }).then((res)=>{
            console.log(res);
            if(res.error){
                alert("error nothing changed!")
            }
            else{
                
                setcheckedSwitch(!checkedSwitch)
                setcheckedNewTweet(!checkedSwitch);
                setcheckedLikes(!checkedSwitch);
                setcheckedNewFollowers(!checkedSwitch);
            }
        })   
        
    }
    
    return ( 
    <div>
        <h1 className={!props.darkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Push notifications</h1>
        <div style={{display: 'flex',alignItems: 'center'}}>
            <div className='karim2'>
            <div onClick={handleChangeSwitch} data-testid="Switch-turn-on-off-notif" className={!props.darkMode? "settingsMenuOptionsLight":"settingsMenuOptionsDark" }>
                <div style={{marginLeft: 10, fontWeight: 500, fontSize:18, display:'center'}}>Push notifications</div>
               
            </div>
            
            </div>
            <div className={!props.darkMode?`arrowIconLight`:`arrowIconDark `} >
                <Switch {...labelSwitch}
                
                checked={checkedSwitch}
                onChange={handleChangeSwitch}
                />
            </div>
               
        </div>
        <p className={!props.darkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" } style={{fontSize:12}}>Get push notifications to find out what's going on when you're not on Larry. You can turn them off anytime.</p>
        {!checkedSwitch&&(
            <div style={{marginTop:75,textAlign:"center"}}>
                <h2 className={!props.darkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Turn on push notifications</h2> 
                <p className={!props.darkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" } style={{fontSize:12}}>To receive notifications as they happen, turn on push notifications. Turn them off anytime.</p>
                <Button 
                onClick={handleChangeSwitch}
                  variant="contained" 
                  className="buttonSettings"
                  style={{marginTop:30,width:100}}>
                    Turn On
                  </Button>
            </div>)}  

    {checkedSwitch&&(<div>   
        <div className='borderHorizontal'></div>
        <h2 className={!props.darkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Related to you and your Lars</h2>       
        <div style={{display: 'flex',alignItems: 'center'}}>
            <div className='karim2'>
            <div onClick={handleChangeNewTweet} className={!props.darkMode? "settingsMenuOptionsLight":"settingsMenuOptionsDark" }>
                <div  style={{marginLeft: 10, fontWeight: 500, fontSize:18, display:'center'}}>Lars</div>
               
            </div>
            
            </div>
            <div className={!props.darkMode?`arrowIconLight`:`arrowIconDark `} >
                <Checkbox {...labelNewTweet}
                data-testid="checkboxNewTweet"
                checked={checkedNewTweet}
                onChange={handleChangeNewTweet}
                />
            </div>
               
        </div>
<div><span className={!props.darkMode?`subtextsettingsMenuOptionsLight`:`subtextsettingsMenuOptionsDark `}  style={{marginLeft: 10, fontWeight: 200, fontSize:12}}>When you turn on Lar notifications from people you follow, you'll get push notifications about their Lras.</span></div>

<div style={{display: 'flex',alignItems: 'center'}}>
            <div className='karim2'>
            <div onClick={handleChangeLikes} className={!props.darkMode? "settingsMenuOptionsLight":"settingsMenuOptionsDark" }>
                <div  style={{marginLeft: 10, fontWeight: 500, fontSize:18, display:'center'}}>Likes</div>
               
            </div>
            
            </div>
            <div className={!props.darkMode?`arrowIconLight`:`arrowIconDark `} >
                <Checkbox {...labelLikes}
                data-testid="checkboxLikes"
                checked={checkedLikes}
                onChange={handleChangeLikes}
                />
            </div>
               
        </div>

        <div style={{display: 'flex',alignItems: 'center'}}>
            <div className='karim2'>
            <div onClick={handleChangeNewFollowers} className={!props.darkMode? "settingsMenuOptionsLight":"settingsMenuOptionsDark" }>
                <div  style={{marginLeft: 10, fontWeight: 500, fontSize:18, display:'center'}}>New Followers</div>
               
            </div>
            
            </div>
            <div className={!props.darkMode?`arrowIconLight`:`arrowIconDark `} >
                <Checkbox {...labelNewFollowers}
                data-testid="checkboxNewFollowers"
                checked={checkedNewFollowers}
                onChange={handleChangeNewFollowers}
                />
            </div>
               
        </div>
        </div>) } 
</div>
                
           
     );
}

export default ChangeNotificationsSettings;