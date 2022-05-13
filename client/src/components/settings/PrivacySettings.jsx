import React, { useState,useEffect } from 'react';
import SettingsMenuOptions from './SettingsMenuOptions';
import PeopleIcon from '@mui/icons-material/People';
import "./Styles/SettingsMenuOptions.css"
import "./Styles/SettingsMenu.css"
import Checkbox from '@mui/material/Checkbox';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import "./Styles/SettingsModals.css"
import { textAlign } from '@mui/system';
import axios from 'axios'

/**
 * component to let the user change the privacy settings.(make his lars available for his followers only)
 * @component
 * @param {boolean} isDarkMode
 * @example
 * props.isDarkMode = true
 * return (
 * <div>
 *    <h1>>Privacy and safety</h1>
 *    <p>Select your preferences by notification type.</p>
 *    <div>Protect your Lars</div>
 *    <Checkbox/>
 * </div>
 * )
 *  
 */
function PrivacySettings(props) {
     //related to request to back end
     const userId=localStorage.getItem("userId");
    //request to back end
    const [checked, setChecked] = useState();

    useEffect(()=>{
    
        axios.get(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userId}/me`, 
            { headers: {
                Authorization: localStorage.getItem("accessToken")}
            }
        ).then((res)=>{
            if(res.data.error){
                
            }
            else{
                setChecked(res.data.isPrivate);
                //console.log(profileData);
                //console.log(res.data.isPrivate);
                console.log(res.data);
            }
        })
        
    }, [])
    // const privateAcc={
    //     privateVal:false
    //profileData.isPrivate
    // }
    
    
    const [isClickedAudience,setAudienceActive]=useState(false);
    

    const [buttonPopup, setButtonPopup] = useState(false);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    function clickedAudience(){
        setAudienceActive(true);
    }
   

    const handleChange = (event) => {
        if(checked===true)
        {
            //make request to back end here
            
            let data={
                isPrivate:false
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
                    setChecked(false);
                    
                    
                }
            })
        }
        else{
            setButtonPopup(true)
        }
        
    };
    const handleClose = () => setButtonPopup(false);
    const  handleSubmit =(e) =>{
        e.preventDefault()
        
        handleClose()
        //make request to backend
        let data={
            isPrivate:true
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
                
                setChecked(true);
                
            }
        })
    }
    return ( 
        <div className="settingsSubMenu">
            {/* if nothing clicked 1*/}
            {isClickedAudience===false &&(<h1 className={!props.isDarkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Privacy and safety</h1>)}
            {isClickedAudience===false &&(<p className={!props.isDarkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" }>Manage what information you see and share on Larry.</p>)}
            {isClickedAudience===false &&(<h2 className={!props.isDarkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" } style={{marginTop:25}}>Your Larry activity</h2>)}
            {isClickedAudience===false &&(<div onClick={clickedAudience} ><SettingsMenuOptions id="11" darkMode={props.isDarkMode} active={isClickedAudience} Icon={PeopleIcon} text="Audience" subtext="Manage what information you allow other people on Twitter to see." isSubtextExist={true}/></div>)}
            {/* Audience clicked */}
            {isClickedAudience===true &&(<h2 className={!props.isDarkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Audience</h2>)}
            {isClickedAudience===true &&(<p className={!props.isDarkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" }>Manage what information you allow other people on Larry to see.</p>)}
            {isClickedAudience===true &&(
                <div>
                    <div style={{display: 'flex',alignItems: 'center'}}>
                        <div onClick={handleChange} className={!props.isDarkMode? "settingsMenuOptionsLight":"settingsMenuOptionsDark" }>
                            <div  style={{marginLeft: 10, fontWeight: 500, fontSize:18, display:'center'}}>Protect your Lars</div>
                            
                        </div>
                        <div className={!props.isDarkMode?`arrowIconLight`:`arrowIconDark `} >
                            <Checkbox {...label}
                            data-testid="checkbox1"
                            onChange={handleChange}
                            checked={checked}
                            />
                        </div>
                        <Modal 
                        open={buttonPopup}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        keepMounted
                        >
                          <form className={!props.isDarkMode? 'protectYourLarsLight':'protectYourLarsDark'} onSubmit={handleSubmit}>
                                <Typography className={!props.isDarkMode? "settingsModalHeaderLight":"settingsModalHeaderDark" } id="modal-modal-title" variant="h6" component="h2" >
                                Protect your Lars?
                                </Typography>
                                <Typography className={!props.isDarkMode? "settingsModalParagraphLight":"settingsModalParagraphDark" } id="modal-modal-description" sx={{ mt: 2 }}>
                                This will make them visible only to your Larry followers. 
                                </Typography>
                                <div style={{textAlign:"center"}}>
                                <Button 
                                type='submit'
                                variant="contained" 
                                className="buttonSettingsModal" 
                                style={{marginTop:24, width:200}}
                                >
                                Protect
                                </Button>
                                </div>
                                <div style={{ textAlign:"center"}}>
                                <Button
                                style={{marginTop:7, width:200}}
                                onClick={handleClose}
                                className="profileCloseContainerButton"
                                >
                                Cancel
                                </Button>
                                </div>
                          </form>
                        </Modal>
                    </div>
                    <p className={!props.isDarkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" }>When selected, your Lars and other account information are only visible to people who follow you.<a className='App-link' href="https://help.twitter.com/en/safety-and-security/public-and-protected-tweets">Learn more</a></p>
                </div>
            )}
        </div>
     );
}

export default PrivacySettings;