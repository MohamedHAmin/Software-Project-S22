import React from 'react';
import "./Styles/SettingsMenuOptions.css"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
/**
 * component to display each option in the Account information SUB menu.
 * (just to make the SUB menu options with the same style and to modularize the code)
 * @component
 * @param {boolean} darkMode
 * @param {number} id the id of selected option in order to make SettingsPage render the correct sub menu
 * @param {boolean} active to know which option is selected to make it with different style.
 * @param {Icon} Icon if there exist an icon to this option it would be displayed
 * @param {string} text the text displayed on the option
 * @param {string} subtext the subtext diplayed just below the option text
 * @param {boolean} isSubtextExist to identify if the option has subtext or no
 * @example
 * props.id = 1
 * props.darkMode = true
 * props.active = true
 * props.text = "Username"
 * props.subtext = "Ahmed"
 * props.isSubtextExist = true
 * const isclickedAcc = true
 * return (
 * <div>
 *    <h2>Username</h2>
 *    <span>Ahmed</span>
 *    <ArrowForwardIosIcon />
 *    ...
 * </div>
 * )
 *  
 */
function AccInfoOptions({id,darkMode,active,Icon,text,subtext,isSubtextExist}) {

    return (
     
      // <div  className={!darkMode?`MainWholeSettingOptionLight ${active && 'MainWholeSettingOptionLight--active'}`:`MainWholeSettingOptionDark ${active && 'MainWholeSettingOptionDark--active'}`}>
       <div  className={!darkMode?`WholeSettingOptionLight ${active && 'WholeSettingOptionLight--active'}`:`WholeSettingOptionDark ${active && 'WholeSettingOptionDark--active'}`}>
          <div className='karim2' >
              <div className={!darkMode?`settingsMenuOptionsLight_Acc`:`settingsMenuOptionsDark_Acc`}>
                {id>5 && id<12  && (<Icon/>)}  
                <h2 style={{marginLeft: 10, fontWeight: 500, fontSize:18}}>{text}</h2>
                
              </div>
              {isSubtextExist &&(<div><span className={!darkMode?`subtextsettingsMenuOptionsLight`:`subtextsettingsMenuOptionsDark `}  style={{marginLeft: 10, fontWeight: 200, fontSize:12}}> {subtext}</span></div>)}
          </div>
          
          <div className={!darkMode?`arrowIconLight`:`arrowIconDark `}><ArrowForwardIosIcon /></div>
      </div>
      
    );
}

export default AccInfoOptions;