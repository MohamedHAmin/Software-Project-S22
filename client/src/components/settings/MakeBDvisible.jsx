import React, { useState,useEffect } from 'react';
import "./Styles/SettingsMenuOptions.css"
import "./Styles/SettingsMenu.css"
import Checkbox from '@mui/material/Checkbox';
import "./Styles/SettingsModals.css"
import axios from 'axios'

/**
 * component to let the user change the visibility of the birth date
 * @component
 * @param {boolean} darkMode
 * @param {Array} profileData all the profile data of the user
 * @example
 * props.darkMode = true
 * props.profileData.birth.visability = false
 * props.profileData.birth.date = "20-8-2001"
 * return (
 * <div>
 *    <div>Make birthdate visible</div>
 *    <span>20-8-2001</span>
 *    <Checkbox>
 * </div>
 * )
 *  
 */

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