import React , {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import "./Styles/SettingsModals.css"
import './Styles/SettingsMenu.css'
import './Styles/SettingsMenuOptions.css'
import axios from 'axios';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function ChangeUserTag(props) {
  const [newValue, setnewValue] = useState('');
  const [isValueChanged, setIsValueChanged] = useState(false);
  const [newValueError, setValueNewError] = useState(false);
  const [newValueTypeError, setValueNewTypeError] = useState(0);
  //modal
  const [buttonPopup, setButtonPopup] = useState(false);
  //related to request to back end
  const userId=localStorage.getItem("userId");
  const  handleSubmit =(e) =>{
    e.preventDefault()
   
    setValueNewError(false);
    if(newValue.length<4){
      setValueNewTypeError(1);
      setValueNewError(true);
        return false;
    }
    //check if email already used by request to back end
    else if(newValue===props.oldValue){
      setValueNewTypeError(2);
      setValueNewError(true);
      return false;
    }
    else{
      
      //send request to backend to givee them new email
      let data={
        tag:newValue
      }
      //
      axios.put(`http://larry-env.eba-c9wvtgzk.us-east-1.elasticbeanstalk.com/api/profile/${userId}`,data, {

        headers: {
          Authorization: localStorage.getItem("accessToken")
        }

      }).then((res)=>{
      console.log(res);
      
        if(res.error){
          
          //error

        }
        else{
          //evreything is correct
          setButtonPopup(true);//show message
          
        }
      })
      .catch(err => {
        setValueNewTypeError(2);
      setValueNewError(true);
        
      });
    }
  }
  const handleChange =(e) =>{
    setnewValue(e.target.value)
    setIsValueChanged(true)
    
  }
  const handleClose = () => setButtonPopup(false);
    return ( 
      <div style={{marginTop:28}}>
        <h2 className={!props.darkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Change username</h2>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <div className="TextFieldStyling">
          <TextField
           InputLabelProps={{className:props.darkMode?"forceChangePasswordMUIDarkMode":""} }
            onChange={(e)=> handleChange(e)}
            id="editData"  
            
            variant="outlined"
            label="Username" 
            color="primary" 
            defaultValue={props.oldValue}  
            inputProps={{"data-testid":"New-Email-AccInfoSpage",className:props.darkMode?"forceChangePasswordMUIDarkMode":"" }}
            fullWidth
            // error={confirmPassValueError}
            // helperText={confirmPassValueError &&("The password you entered was incorrect.")}

            error={newValueError}
          helperText={newValueError &&(  newValueTypeError===1?  ("Your username must be longer than 3 characters."):("Username already used."))}

          />
          </div>
          <div style={{textAlign:'right',marginRight:17}}>
        <Button 
        type='submit'
        variant="contained" 
        disabled={!isValueChanged}
        className={!isValueChanged?"buttonSettingsDisabled":"buttonSettings" } 
        style={{marginTop:24}}>
          Save
        </Button>
        </div>
        </form>
        <Modal 
              open={buttonPopup}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              keepMounted
              >
                <div style={{verticalAlign:'middle'}}>
                <form className={!props.darkMode? 'protectYourLarsLight':'protectYourLarsDark'} onSubmit={handleSubmit}>
                      <Typography  className={!props.darkMode? "settingsModalHeaderCenteredLight":"settingsModalHeaderCenteredDark" } style={{ textAlign:"center"}} id="modal-modal-title" variant="h6" component="h2" >
                        Username changed!
                      </Typography>
                      <div style={{ textAlign:"center"}}>
                      <Button
                      variant="contained" 
                      style={{marginTop:7, width:200}}
                      onClick={handleClose}
                      className="buttonSettingsModal"
                      >
                      Close
                      </Button>
                      </div>
                </form>
                </div>
          </Modal>
        </div>
     );
}

export default ChangeUserTag;