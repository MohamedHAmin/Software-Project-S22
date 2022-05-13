import React , {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import "./Styles/SettingsModals.css"
import './Styles/SettingsMenu.css'
import './Styles/SettingsMenuOptions.css'
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function TemplateFormEditAccInfo(props) {
  const [newValue, setnewValue] = useState('');
  const [isValueChanged, setIsValueChanged] = useState(false);
  const [newValueError, setValueNewError] = useState(false);
  const [newValueTypeError, setValueNewTypeError] = useState(0);
  //modal
  const [buttonPopup, setButtonPopup] = useState(false);
  const  handleSubmit =(e) =>{
    e.preventDefault()
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    setValueNewError(false);
    if(!newValue || regex.test(newValue) === false){
      setValueNewTypeError(1);
      setValueNewError(true);
        return false;
    }
    //check if email already used by request to back end
    else if(newValue==="karimy@gmail.com"){
      setValueNewTypeError(2);
      setValueNewError(true);
      return false;
    }
    else{
      setButtonPopup(true);//show message
      //send request to backend to givee them new email
    }
  }
  const handleChange =(e) =>{
    setnewValue(e.target.value)
    setIsValueChanged(true)
    
  }
  const handleClose = () => setButtonPopup(false);
    return ( 
      <div style={{marginTop:28}}>
        <h2 className={!props.darkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Change {props.text}</h2>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <div className="TextFieldStyling">
          <TextField
           InputLabelProps={{className:props.darkMode?"forceChangePasswordMUIDarkMode":""} }
            onChange={(e)=> handleChange(e)}
            id="editData"  
            type="email"
            variant="outlined"
            label={props.text} 
            color="primary" 
            defaultValue={props.oldValue}  
            inputProps={{"data-testid":"New-Email-AccInfoSpage",className:props.darkMode?"forceChangePasswordMUIDarkMode":"" }}
            fullWidth
            // error={confirmPassValueError}
            // helperText={confirmPassValueError &&("The password you entered was incorrect.")}

            error={newValueError}
          helperText={newValueError &&(  newValueTypeError===1?  ("Incorrect email"):("Email already used"))}

          />
          </div>
          <div style={{textAlign:'right',marginRight:17}}>
        <Button 
        type='submit'
        variant="contained" 
        disabled={!isValueChanged}
        className={props.darkMode?"forceChangePasswordMUIDarkMode":""} 
        style={{marginTop:24}}>
          save
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
                        Email changed!
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

export default TemplateFormEditAccInfo;