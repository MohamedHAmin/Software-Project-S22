import React, { useState } from 'react';
import './Styles/SettingsMenu.css'
import SettingsMenuOptions from './SettingsMenuOptions';
import MenuOfChoosenSetting from './MenuOfChoosenSetting';
import KeyIcon from '@mui/icons-material/Key';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

function SettingsMenu(props){

    const [isclickedAcc,setAccActive]=useState(true);
    const [isclickedSecurity,setSecurActive]=useState(false);
    const [isclickedPrivacy,setPrivacyActive]=useState(false);
    const [isclickedNotifications,setNotificationActive]=useState(false);
    const [isclickedAccessibility,setAccessibilityActive]=useState(false);
    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        marginBottom:20,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(3),
          width: 'auto',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding: theme.spacing(1, 1, 1, 0),
          // vertical padding + font size from searchIcon
          paddingLeft: `calc(1em + ${theme.spacing(4)})`,
          transition: theme.transitions.create('width'),
          width: '100%',
          [theme.breakpoints.up('md')]: {
            width: '20ch',
          },
        },
      }));
    function clickedAccount(){
        setAccActive(true);
        setSecurActive(false);
        setPrivacyActive(false);
        setNotificationActive(false);
        setAccessibilityActive(false);
        <MenuOfChoosenSetting />
    }
    function clickedSecurity(){
        setAccActive(false);
        setSecurActive(true);
        setPrivacyActive(false);
        setNotificationActive(false);
        setAccessibilityActive(false);

    }
    function clickedPrivacy(){
        setAccActive(false);
        setSecurActive(false);
        setPrivacyActive(true);
        setNotificationActive(false);
        setAccessibilityActive(false);
    }
    function clickedNotifications(){
        setAccActive(false);
        setSecurActive(false);
        setPrivacyActive(false);
        setNotificationActive(true);
        setAccessibilityActive(false);

    }
    function clickedAccessibility(){
        setAccActive(false);
        setSecurActive(false);
        setPrivacyActive(false);
        setNotificationActive(false);
        setAccessibilityActive(true);
    }
    return(
        <div className="settingsMenu">
            <h1 className={props.isDarkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Settings</h1>
            {/*,clickedSecurity,clickedPrivacy,clickedNotifications,clickedAccessibility settings menu{fontWeight:500, fontSize:22} */}
            <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
           
       
        <div  onClick={clickedAccount}><SettingsMenuOptions id="1" darkMode={props.isDarkMode} active={isclickedAcc} Icon={KeyIcon}  text="Your account"/> </div>
        <div  onClick={clickedSecurity}><SettingsMenuOptions id="2" active={isclickedSecurity} Icon={KeyIcon} text="Security and account access"/> </div> 
        <div  onClick={clickedPrivacy}><SettingsMenuOptions id="3" active={isclickedPrivacy} Icon={KeyIcon} text="Privacy and safety"/>  </div>
        <div  onClick={clickedNotifications}><SettingsMenuOptions id="4" active={isclickedNotifications} Icon={KeyIcon} text="Notifications"/>  </div>
        <div  onClick={clickedAccessibility}><SettingsMenuOptions id="5" active={isclickedAccessibility} Icon={KeyIcon} text="accessibility, display, and languages"/>  </div>
      {/* mini menu of choosen setting  */}
      
        </div>    
    );

}

export default SettingsMenu;