import React , {useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import "./Styles/SettingsModals.css"
import './Styles/SettingsMenu.css'
import './Styles/SettingsMenuOptions.css'
import axios from 'axios'
/**
 * component to let the user add phone number if he does not have it already on Larry.
 * @component
 * @param {boolean} darkMode
 * @example
 * props.darkMode = true
 * const newValue = "01157828196"
 * return (
 * <div>
 *    <h2>Change Phone</h2>
 *    <h2>Add phone number</h2>
 *    <Modal>
 *      <TextField/>
 * 
 *      <Button> Save
 *      </Button>
 * 
 *      <Button> Close
 *      </Button> 
 *    </Modal> 
 *    ...
 * </div>
 * )
 *  
 */
function ChangePhoneNum(props) {
  const [newValue, setnewValue] = useState('');
  const [newValueError, setValueNewError] = useState(false);
  const [newValueTypeError, setValueNewTypeError] = useState(0);

  //modal
  const [buttonPopup, setButtonPopup] = useState(false);
  const [button2Popup, setButton2Popup] = useState(false);

  //related to request to back end
  const userId=localStorage.getItem("userId");
  const regex =/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
 
  const  handleSubmit =(e) =>{
    e.preventDefault()
    setValueNewError(false);
    if(newValue.length!=11){
      setValueNewTypeError(1);
      setValueNewError(true);
        return false;
    }
    else if(regex.test(newValue)=== false){
      setValueNewTypeError(1);
      setValueNewError(true);
        return false;
    }
    else{
      //popup to let the user know that the phone is updated then in close the request is sent
      setButton2Popup(true);
      //show message then
      //send request to backend to givee them new email
    }
  }
  const handleChange =(e) =>{
    setnewValue(e.target.value)
  }
  const handleClose = () =>{
    setButtonPopup(false);
  } 
  const handleClose2 = () =>{
    
    let data={
      phoneNumber:newValue
    }
    //send request to backend 
    axios.put(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${userId}`,data, {

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
        props.onChangerefreshAfterPhone();
        
      }
    })
    .catch(err => {
      
      alert("error")
    });
    setButton2Popup(false);
    handleClose();
  } 
  
  //click to open the modal 
  const handleClick = () =>{
    setButtonPopup(true)
  }
    return ( 
        <div>
      <div style={{marginTop:28}}>
        <h2 className={!props.darkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Change Phone</h2>
        <div  className={`WholeSettingsAddPhoneOption `}>
            <div onClick={handleClick} className={!props.darkMode?`settingsMenuOptionsLight`:`settingsMenuOptionsDark `}>
              <h2 style={{ fontWeight: 500, fontSize:18, color:"var(--larry-color)", textAlign:"center !important"}}>Add phone number</h2>
            </div>
        </div>
        <Modal 
            open={buttonPopup}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            keepMounted
            >
            <form className={!props.darkMode? 'AddPhoneLight':'AddPhoneDark'} onSubmit={handleSubmit}>
              <Typography className={!props.darkMode? "settingsModalHeaderLight":"settingsModalHeaderDark" } id="modal-modal-title" variant="h6" component="h2" >
                  Add a phone number
              </Typography>
              <Typography className={!props.darkMode? "settingsModalParagraphLight":"settingsModalParagraphDark" } id="modal-modal-description" sx={{ mt: 2 }}>
                  Enter the phone number you'd like to associate with your Larry account. You'll get a verification code sent here. 
              </Typography>
                  
              <div className="TextFieldStyling">
                <TextField
                  InputLabelProps={{className:props.darkMode?"forceChangePasswordMUIDarkMode":""} }
                  onChange={(e)=> handleChange(e)}
                  id="editData"  
                  variant="outlined"
                  label="Your phone number" 
                  color="primary" 
                  inputProps={{"data-testid":"New-Phone-AccInfoSpage",className:props.darkMode?"forceChangePasswordMUIDarkMode":"" }}
                  fullWidth
                  error={newValueError}
                  helperText={newValueError &&(  newValueTypeError===1?  ("Please enter a valid phone number."):("Phone number already used."))}
                />
              </div>
              <div style={{textAlign:"center",verticalAlign:'middle'}}>
                  <Button 
                  type='submit'
                  variant="contained" 
                  className="buttonSettingsModal"
                  style={{marginTop:30,width:200}}>
                    save
                  </Button>
              </div>
              <div style={{verticalAlign:'middle'}}> 
                  <div style={{ textAlign:"center"}}>
                    <Button
                    variant="outlined" 
                    style={{marginTop:10, width:200}}
                    onClick={handleClose}
                    className="profileCloseContainerButton"
                    >
                    Close
                    </Button>
                  </div>
              </div>
            </form>
          </Modal>
          <Modal 
              open={button2Popup}
              onClose={handleClose2}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              keepMounted
              >
                <div style={{verticalAlign:'middle'}}>
                  <form className={!props.darkMode? 'protectYourLarsLight':'protectYourLarsDark'}>
                      <Typography  className={!props.darkMode? "settingsModalHeaderCenteredLight":"settingsModalHeaderCenteredDark" } style={{ textAlign:"center"}} id="modal-modal-title" variant="h6" component="h2" >
                        Phone number added!
                      </Typography>
                      <div style={{ textAlign:"center"}}>
                        <Button 
                        variant="contained" 
                        style={{marginTop:7, width:200}}
                        onClick={handleClose2}
                        className="buttonSettingsModal"
                        >
                        Close
                        </Button>
                      </div>
                  </form>
                </div>
          </Modal>
        </div>
      </div>
     );
}

export default ChangePhoneNum;