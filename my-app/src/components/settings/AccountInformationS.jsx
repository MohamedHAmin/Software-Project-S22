import React , {useState} from 'react';
import SettingsMenuOptions from './SettingsMenuOptions';
import './Styles/SettingsMenu.css'
import './Styles/SettingsMenuOptions.css'
import TemplateFormEditAccInfo from './TemplateFormEditAccInfo';


function AccountInformationS(props) {
    const [isClickedUsername,setUsernameActive]=useState(false);
    const [isClickedPhone,setPhoneActive]=useState(false);
    const [isClickedEmail,setEmailActive]=useState(false);
    const [isClickedCountry,setCountryActive]=useState(false);
    const [isClickedGender,setGenderActive]=useState(false);
    const [isClickedBirthDate,setBirthDateActive]=useState(false);
    const [isClickedAge,setAgeActive]=useState(false);
    const [anythingClicked,setanythingClicked]=useState(false);
    function clickedUsername(){
        setUsernameActive(true);
        setPhoneActive(false);       
        setEmailActive(false);
        //set var that something is clicked to true
        setanythingClicked(true);
    }
    function clickedPhone(){
        setUsernameActive(false);
        setPhoneActive(true);       
        setEmailActive(false);
        //set var that something is clicked to true
        setanythingClicked(true);        
    }
    function clickedEmail(){
        setUsernameActive(false);
        setPhoneActive(false);       
        setEmailActive(true);  
        //set var that something is clicked to true
        setanythingClicked(true);      
    }
    function clickedCountry(){
        setUsernameActive(false);
        setPhoneActive(false);       
        setEmailActive(false);
        setCountryActive(true);
        setGenderActive(false);
        setBirthDateActive(false);
        setAgeActive(false);
        //set var that something is clicked to true
        setanythingClicked(true);
    }
    function clickedGender(){
        setUsernameActive(false);
        setPhoneActive(true);       
        setEmailActive(false);
        setCountryActive(false);
        setGenderActive(true);
        setBirthDateActive(false);
        setAgeActive(false);
        //set var that something is clicked to true
        setanythingClicked(true);        
    }
    function clickedBirthDate(){
        setUsernameActive(false);
        setPhoneActive(false);       
        setEmailActive(true);  
        setCountryActive(false);
        setGenderActive(false);
        setBirthDateActive(true);
        setAgeActive(false);
        //set var that something is clicked to true
        setanythingClicked(true);      
    }
    function clickedAge(){
        setUsernameActive(false);
        setPhoneActive(false);       
        setEmailActive(true);  
        setCountryActive(false);
        setGenderActive(false);
        setBirthDateActive(false);
        setAgeActive(true);
        //set var that something is clicked to true
        setanythingClicked(true);      
    }

    const Data={
        username:'kimoo123',
        phone:"01157828196",
        email:"karimyasser34@gmail.com",
        country:"Egypt",
        gender:"Male",
        birthdate:"20-8-2001",
        age:"20"
    }
    return (
        <div >
            {!anythingClicked&&(<div onClick={clickedUsername} ><SettingsMenuOptions id="12" darkMode={props.darkMode}  active={isClickedUsername} text="Username" subtext={Data.username} isSubtextExist={true} /></div>)}
            {!anythingClicked &&(<div onClick={clickedPhone} ><SettingsMenuOptions id="13" darkMode={props.darkMode}  active={isClickedPhone} text="Phone" subtext={Data.phone} isSubtextExist={true} /></div>)}
            {!anythingClicked &&(<div onClick={clickedEmail} ><SettingsMenuOptions id="14" darkMode={props.darkMode} active={isClickedEmail} text="Email" subtext={Data.email} isSubtextExist={true} /></div>)}
            {!anythingClicked &&(<div onClick={clickedCountry} ><SettingsMenuOptions id="15" darkMode={props.darkMode} active={isClickedCountry} text="Country" subtext={Data.country} isSubtextExist={true} /></div>)}
            {!anythingClicked &&(<div onClick={clickedGender} ><SettingsMenuOptions id="16" darkMode={props.darkMode} active={isClickedGender} text="Gender" subtext={Data.gender} isSubtextExist={true} /></div>)}
            {!anythingClicked &&(<div onClick={clickedBirthDate} ><SettingsMenuOptions id="17" darkMode={props.darkMode} active={isClickedBirthDate} text="Birth Date" subtext={Data.birthdate} isSubtextExist={true} /></div>)}
            {!anythingClicked &&(<div onClick={clickedAge} ><SettingsMenuOptions id="18" darkMode={props.darkMode} active={isClickedAge} text="Age" subtext={Data.age} isSubtextExist={true} /></div>)}

            {/*if the clicked option is Username */}
            {isClickedUsername &&(<div><TemplateFormEditAccInfo id="111" text="username" oldValue={Data.username} darkMode={props.darkMode}/></div>)} 
            {isClickedPhone &&(<div><TemplateFormEditAccInfo id="121" text="phone" oldValue={Data.phone} darkMode={props.darkMode}/></div>)} 
            {isClickedEmail &&(<div><TemplateFormEditAccInfo id="131" text="email" oldValue={Data.email} darkMode={props.darkMode}/></div>)} 
            {isClickedCountry &&(<div><TemplateFormEditAccInfo id="141" text="country" oldValue={Data.country} darkMode={props.darkMode}/></div>)} 
            {isClickedGender &&(<div><TemplateFormEditAccInfo id="151" text="gender" oldValue={Data.gender} darkMode={props.darkMode}/></div>)} 
            {isClickedBirthDate &&(<div><TemplateFormEditAccInfo id="161" text="Birthdate" oldValue={Data.birthdate} darkMode={props.darkMode}/></div>)} 
            {isClickedAge &&(<div><TemplateFormEditAccInfo id="171" text="Age" oldValue={Data.age} darkMode={props.darkMode}/></div>)} 
        </div>
      );
}

export default AccountInformationS;