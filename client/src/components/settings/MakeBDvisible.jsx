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


function MakeBDvisible(props) {
    //request to back end
    //related to request to back end
    const userId=localStorage.getItem("userId");
   // const [profileData, setProfileData]=useState(props.profileData.birth.date);

    // const privateAcc={
    //     privateVal:false
    //profileData.birthDate.visability
    // }

    const [checked, setChecked] = useState(props.profileData.birth.visability);

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    

    const handleChange = (event) => {
        
            //make request to back end here
            
            let data={
                birth:{visability:!checked}
            }
            axios.put(`http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/profile/${userId}`,data, {

              headers: {
                Authorization: localStorage.getItem("accessToken")
              }
      
            }).then((res)=>{
                console.log(res);
                if(res.error){
                    alert("error nothing changed!")
                }
                else{
                    
                    setChecked(!checked);
                }
            })   
    };
    
    return ( 
        
                
        <div style={{display: 'flex',alignItems: 'center'}}>
            <div className='karim2'>
            <div onClick={handleChange} className={!props.darkMode? "settingsMenuOptionsLight_Acc":"settingsMenuOptionsDark_Acc" }>
                <div  style={{marginLeft: 10, fontWeight: 500, fontSize:18, display:'center'}}>Make birthdate visible</div>
               
            </div>
            <div><span className={!props.darkMode?`subtextsettingsMenuOptionsLight`:`subtextsettingsMenuOptionsDark `}  style={{marginLeft: 10, fontWeight: 200, fontSize:12}}>{props.profileData.birth.date}</span></div>
            </div>
            <div className={!props.darkMode?`arrowIconLight`:`arrowIconDark `} >
                <Checkbox {...label}
                data-testid="checkbox1"
                checked={checked}
                onChange={handleChange}
                />
            </div>
            
        </div>

                
           
     );
}

export default MakeBDvisible;