import React, { useState } from 'react';
import SettingsMenuOptions from './SettingsMenuOptions';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import UpdatePassword from './UpdatePassword';
import "./Styles/SettingsMenu.css"
import ConfirmPassword from './ConfirmPassword';
import AccountInformationS from './AccountInformationS';
function AccountSettings(props) {
    //vars of the main account settings page
    const [isClickedAccInfo,setAccInfoActive]=useState(false);
    const [isClickedChangePassword,setChangePasswordActive]=useState(false);
    function clickedAccInfo(){
        setAccInfoActive(true);
        setChangePasswordActive(false);        
    }
    function clickedChangePassword(){
        setAccInfoActive(false);
        setChangePasswordActive(true);        
    }
    //vars for the confirm button in account information
    const [isConfirmPassInAccInfo,setisConfirmPassInAccInfo]=useState(false);
  function handleChangeConfirmPassInAccInfo(){
    setisConfirmPassInAccInfo(true);
  }
  
    return ( 
        <div className="settingsSubMenu">
        {/* if nothing clicked 1*/}
            {isClickedAccInfo===false &&isClickedChangePassword===false && (<h1 className={!props.isDarkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Your account</h1>)}
            {isClickedAccInfo===false &&isClickedChangePassword==false && (<p className={!props.isDarkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" }>See information about your account, download an archive of your data, or learn about your account deactivation options</p>)}
        {/* Account information clicked */}
            {/* {isClickedAccInfo===true &&isClickedChangePassword===false && (<h1 className={!props.isDarkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Account information</h1>)}
            {isClickedAccInfo===true &&isClickedChangePassword===false && isConfirmPassInAccInfo===false &&(<p className={!props.isDarkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" }>See information about your account, download an archive of your data, or learn about your account deactivation options</p>)} */}
            {/* {isClickedAccInfo===true && isClickedChangePassword===false && isConfirmPassInAccInfo===false && (<div ><ConfirmPassword darkMode={props.isDarkMode} onConfirmPassChange={handleChangeConfirmPassInAccInfo} /></div>)}  */}
            {isClickedAccInfo===true &&isClickedChangePassword===false &&(<AccountInformationS darkMode={props.isDarkMode}/>)}
        {/* change Password clicked */}
            {isClickedAccInfo===false &&isClickedChangePassword===true && (<h1 className={!props.isDarkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Change your password</h1>)}
            {isClickedAccInfo===false && isClickedChangePassword===true &&(<div ><UpdatePassword darkMode={props.isDarkMode}  /></div>)} 
        {/* if nothing clicked 2*/}
            {isClickedAccInfo===false &&isClickedChangePassword===false && (<div onClick={clickedAccInfo} ><SettingsMenuOptions id="6" darkMode={props.isDarkMode} active={isClickedAccInfo} Icon={PersonIcon} text="Account information" subtext="See your account information like your phone number and email address." isSubtextExist={true} /></div>)}
            {isClickedChangePassword===false &&isClickedAccInfo===false && (<div onClick={clickedChangePassword} ><SettingsMenuOptions id="7" darkMode={props.isDarkMode} Icon={KeyIcon} active={isClickedChangePassword}  text="Change your password" subtext="Change your password at any time." isSubtextExist={true} /></div>)}
        </div>
     );
}
export default AccountSettings;
    