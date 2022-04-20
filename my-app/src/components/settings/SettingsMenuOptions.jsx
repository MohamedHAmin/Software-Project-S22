import React from 'react';
import "./Styles/SettingsMenuOptions.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function SettingsMenuOptions({id,darkMode,active,Icon,text,subtext,isSubtextExist}) {

    return (
     
      // <div  className={!darkMode?`MainWholeSettingOptionLight ${active && 'MainWholeSettingOptionLight--active'}`:`MainWholeSettingOptionDark ${active && 'MainWholeSettingOptionDark--active'}`}>
       <div  className={!darkMode?`WholeSettingOptionLight ${active && 'WholeSettingOptionLight--active'}`:`WholeSettingOptionDark ${active && 'WholeSettingOptionDark--active'}`}>
          <div className='karim2' >
              <div className={!darkMode?`settingsMenuOptionsLight`:`settingsMenuOptionsDark `}>
                {id>5 && id<12  && (<Icon/>)}  
                <h2 style={{marginLeft: 10, fontWeight: 500, fontSize:18}}>{text}</h2>
                
              </div>
              {isSubtextExist &&(<div><span className={!darkMode?`subtextsettingsMenuOptionsLight`:`subtextsettingsMenuOptionsDark `}  style={{marginLeft: 10, fontWeight: 200, fontSize:12}}> {subtext}</span></div>)}
          </div>
          
          <div className={!darkMode?`arrowIconLight`:`arrowIconDark `}><ArrowForwardIosIcon /></div>
      </div>
      
    );
}

export default SettingsMenuOptions;