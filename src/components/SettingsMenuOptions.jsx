import React from 'react';
import "./Styles/SettingsMenuOptions.css"
import "./Styles/SubMenu.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';



function SettingsMenuOptions({id,darkMode,active,Icon,text,subtext}) {

    return (
      <div className={!darkMode?`settingsMenuOptionsLight ${active && 'settingsMenuOptionsLight--active'}`:`settingsMenuOptionsDark ${active && 'settingsMenuOptionsDark--active'}`}>
      {id>5 && (<Icon/>)}
      <h2 style={{marginLeft: 10, fontWeight: 200}}>{text}</h2>

      <div style={{marginLeft: 10, fontWeight: 100, fontSize:12}}>{subtext}</div>
      
      
      <div className="arrowIcon"><ArrowForwardIosIcon /></div>

      </div>


    );
}

export default SettingsMenuOptions;