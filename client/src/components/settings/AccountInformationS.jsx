import React , {useState,useEffect} from 'react';
import PrivacySettings from './PrivacySettings';
import './Styles/SettingsMenu.css'
import './Styles/SettingsMenuOptions.css'
import ChangeUserTag from './ChangeUserTag';
import TemplateFormEditAccInfo from './TemplateFormEditAccInfo';
import AccInfoOptions from './AccInfoOptions';
import MakeBDvisible from './MakeBDvisible';
import MakeLocVisible from './MakeLocVisible';
import axios from 'axios';
import AddPhoneNum from './AddPhoneNum';
import ChangePhoneNum from './ChangePhoneNum';

/**
 * component to display the whole page of Account information SUB menu.(it renders inside it <AccInfoOptions/> to display each option only)
 * @component
 * @param {boolean} darkMode
 * @example
 * props.darkMode = true
 * const anythingClicked = false
 * return (
 * <div>
 *    <h1>Account information</h1>
 *    >See information about your account, download an archive of your data, or learn about your account deactivation options</p>
 *    <AccInfoOptions Username/>
 *    <AccInfoOptions Phone/>
 *    <AccInfoOptions Email/>
 *    ...
 * </div>
 * )
 *  
 */
function AccountInformationS(props) {
    
    const [isClickedUsername,setUsernameActive]=useState(false);
    const [isClickedPhone,setPhoneActive]=useState(false);
    const [isClickedEmail,setEmailActive]=useState(false);
    const [isClickedProtectedLars,setProtectedLarsActive]=useState(false);
    const [isClickedBirthDate,setBirthDateActive]=useState(false);
    const [isClickedLocation,setLocationActive]=useState(false);
    const [anythingClicked,setanythingClicked]=useState(false);
    function clickedUsername(){
        setUsernameActive(true);
        setPhoneActive(false);       
        setEmailActive(false);
        setProtectedLarsActive(false);
        setBirthDateActive(false);
        setLocationActive(true);
        //set var that something is clicked to true
        setanythingClicked(true);
    }
    function clickedPhone(){
        setUsernameActive(false);
        setPhoneActive(true);       
        setEmailActive(false);
        setProtectedLarsActive(false);
        setBirthDateActive(false);
        setLocationActive(true);
        //set var that something is clicked to true
        setanythingClicked(true);        
    }
    function clickedEmail(){
        setUsernameActive(false);
        setPhoneActive(false);       
        setEmailActive(true);  
        setProtectedLarsActive(false);
        setBirthDateActive(false);
        setLocationActive(true);
        //set var that something is clicked to true
        setanythingClicked(true);      
    }
    function clickedProtectedLars(){
        setUsernameActive(false);
        setPhoneActive(false);       
        setEmailActive(false);
        setProtectedLarsActive(true);
        setBirthDateActive(false);
        setLocationActive(false);
        //set var that something is clicked to true
        setanythingClicked(true);
    }
    function clickedGender(){
        setUsernameActive(false);
        setPhoneActive(false);       
        setEmailActive(false);
        setProtectedLarsActive(false);
        setBirthDateActive(false);
        setLocationActive(false);
        //set var that something is clicked to true
        setanythingClicked(true);        
    }
    function clickedBirthDate(){
        setUsernameActive(false);
        setPhoneActive(false);       
        setEmailActive(false);  
        setProtectedLarsActive(false);
        setBirthDateActive(true);
        setLocationActive(false);
        //do not set var that something is clicked to true    
    }
    function clickedLocation(){
        setUsernameActive(false);
        setPhoneActive(false);       
        setEmailActive(false);  
        setProtectedLarsActive(false);
        setBirthDateActive(false);
        setLocationActive(true);
        //do not set var that something is clicked to true  
    }
    //to refresh the page after adding phone
    const [refreshAfterPhone, setrefreshAfterPhone] = useState(false);
    function handleChangerefreshAfterPhone() {
        setrefreshAfterPhone(!refreshAfterPhone);
        
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
        
    }, [refreshAfterPhone])
    return (
        <div >
            {!anythingClicked&&(<h1 className={!props.darkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Account information</h1>)}
            {!anythingClicked&&(<p className={!props.darkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" }>See information about your account, download an archive of your data, or learn about your account deactivation options</p>)}
            {!anythingClicked&&(<div onClick={clickedUsername} ><AccInfoOptions id="12" darkMode={props.darkMode}  active={isClickedUsername} text="Username" subtext={profileData.tag} isSubtextExist={true} /></div>)}{/*profileData.screenName*/}
            {!anythingClicked &&(<div onClick={clickedPhone} ><AccInfoOptions id="13" darkMode={props.darkMode}  active={isClickedPhone} text="Phone" subtext={profileData.phoneNumber} isSubtextExist={true} /></div>)}
            {!anythingClicked &&(<div onClick={clickedEmail} ><AccInfoOptions id="14" darkMode={props.darkMode} active={isClickedEmail} text="Email" subtext={profileData.email} isSubtextExist={true} /></div>)}
            {!anythingClicked &&(<div className='karim2'><span className={!props.darkMode?`settingsMenuOptionsLight_Acc`:`settingsMenuOptionsDark_Acc `} style={{fontWeight:500, fontSize:18,cursor:"default"}}>Verified</span><span className={!props.darkMode?`subtextsettingsMenuOptionsLight`:`subtextsettingsMenuOptionsDark `}  style={{marginBottom:10,marginLeft: 10, fontWeight: 200, fontSize:12,cursor:"default"}}>{profileData.verified?"Yes":"No"}</span></div>)}{/*profileData.verified*/}
            {!anythingClicked &&(<div className='borderHorizontal' ></div>)}
            {!anythingClicked &&(<div onClick={clickedProtectedLars} ><AccInfoOptions id="15" darkMode={props.darkMode} active={isClickedProtectedLars} text="Protected Lars" subtext={profileData.isPrivate? "Yes":"No"} isSubtextExist={true} /></div>)}{/*profileData.isPrivate*/ }
            {!anythingClicked &&(<div className='karim2'><span className={!props.darkMode?`settingsMenuOptionsLight_Acc`:`settingsMenuOptionsDark_Acc `} style={{ fontWeight:500, fontSize:18,cursor:"default"}}>Account creation</span><span className={!props.darkMode?`subtextsettingsMenuOptionsLight`:`subtextsettingsMenuOptionsDark `}  style={{marginBottom:10,marginLeft: 10, fontWeight: 200, fontSize:12,cursor:"default"}}>{profileData.createdAt}</span></div>)}{/*profileData.isPrivate*/ }
            {!anythingClicked &&(<div className='borderHorizontal' ></div>)}       
            {!anythingClicked && ready &&(<div onClick={clickedBirthDate} ><MakeBDvisible darkMode={props.darkMode} profileData={profileData}/></div>)}
            {!anythingClicked && ready && profileData.location.place&&(<div onClick={clickedLocation}><MakeLocVisible darkMode={props.darkMode} profileData={profileData}/></div>)}
            {/*if the clicked option is Username */}
            {isClickedUsername &&(<div><ChangeUserTag  oldValue={profileData.tag} darkMode={props.darkMode}/></div>)}
            {isClickedPhone && !profileData.phoneNumber&&(<div><AddPhoneNum  darkMode={props.darkMode} onChangerefreshAfterPhone={handleChangerefreshAfterPhone}/></div>)} 
            {isClickedPhone && profileData.phoneNumber&&(<div><ChangePhoneNum oldValue={profileData.phoneNumber}  darkMode={props.darkMode} onChangerefreshAfterPhone={handleChangerefreshAfterPhone}/></div>)}
            {isClickedEmail &&(<div><TemplateFormEditAccInfo id="131" text="email" oldValue={profileData.email} darkMode={props.darkMode}/></div>)} 
            {isClickedProtectedLars &&(<PrivacySettings isDarkMode={props.darkMode} />)}  
        </div>
      );
}

export default AccountInformationS;