import React from 'react';
import './Styles/MenuOfChoosenSetting.css'
import SettingsMenuOptions from './SettingsMenuOptions';
import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
function MenuOfChoosenSetting(props) {
    
    
    return (  
        <div className="menuOfChoosenSetting">
        
        {/*menu of choosen settings  */}
    
    {/* {props.id===1 && (<SettingsMenuOptions isDarkMode={props.isDarkmode} active Icon={PersonIcon} text="Account information"/>,<SettingsMenuOptions Icon={KeyIcon}  text="Change your password"/> ) } */}
    <SettingsMenuOptions id="6" isDarkMode={props.isDarkMode} Icon={PersonIcon} text="Account information"/>
    <SettingsMenuOptions id="7" isDarkMode={props.isDarkMode} Icon={KeyIcon}  text="Change your password"/>

        </div>
    );
    
        
    
}
export default MenuOfChoosenSetting;