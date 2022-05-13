import React , {useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import "./Styles/SettingsModals.css"
import './Styles/SettingsMenu.css'
import './Styles/SettingsMenuOptions.css'
import axios from 'axios'
/**
 * component to let the user change his phone number or delete it.
 * @component
 * @param {boolean} darkMode
 * @param {string} oldValue the old value stored in data base
 * @param {function} onChangerefreshAfterPhone a function all its purpose is to make the parent componenet 
 * AccountInformaationS refresh the page (using useEffect) to show the new data (the new phone number added)
 * or if the user deleted his phone number it refreshes the page to display page of "Add phone number"
 * @example
 * props.darkMode = true
 * props.oldValue = "01171458789"
 * const newValue = "01157828196"
 * return (
 * <div>
 *    <h2>Change Phone</h2>
 *    <TextField/>
 *    <Button> Update phone number
 *    </Button>
 *    ...
 * </div>
 * )
 *  
 */
function ChangePhoneNum(props) {
    
  const [newValue, setnewValue] = useState('');
  const [isValueChanged, setIsValueChanged] = useState(false);
  const [newValueError, setValueNewError] = useState(false);
  const [newValueTypeError, setValueNewTypeError] = useState(0);
  //modal
  const [buttonPopup, setButtonPopup] = useState(false);
  //modal close
  const [buttonclosePopup, setButtonClosePopup] = useState(false);
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
    //check if email already used by request to back end
    else if(newValue===props.oldValue){
      setValueNewTypeError(2);
      setValueNewError(true);
      return false;
    }
    else if(regex.test(newValue)=== false){
        setValueNewTypeError(1);
        setValueNewError(true);
        return false;
      }
    else{
      let data={
        phoneNumber:newValue
      }
      //send request to backend to givee them new email
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
          setButtonPopup(true);//show message
          props.onChangerefreshAfterPhone();
        }
      })
      .catch(err => {
        
        alert("error")
      });
    }
  }
  const handleChange =(e) =>{
    setnewValue(e.target.value)
    setIsValueChanged(true)
    
  }
  const handleClickDelete =()=>{
    let data={
        phoneNumber:""
      }
      //
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
        //   window.location.reload();
        }
      })
      .catch(err => {
        
        alert("error")
      });
  //show message
  //send request to backend to givee them new email
}
  
  const handleClose = () => setButtonPopup(false);
    return ( 
      <div style={{marginTop:28}}>
        <h2 className={!props.darkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Change phone</h2>
        <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <div className="TextFieldStyling">
          <TextField
           InputLabelProps={{className:props.darkMode?"forceChangePasswordMUIDarkMode":""} }
            onChange={(e)=> handleChange(e)}
            id="editData"  
            
            variant="outlined"
            label="Current"
            color="primary" 
            defaultValue={props.oldValue}  
            inputProps={{"data-testid":"Updated-Phone-AccInfoSpage",className:props.darkMode?"forceChangePasswordMUIDarkMode":"" }}
            fullWidth
            // error={confirmPassValueError}
            // helperText={confirmPassValueError &&("The password you entered was incorrect.")}

            error={newValueError}
            helperText={newValueError &&(  newValueTypeError===1?  ("Please enter a valid phone number."):("Phone number already used."))}

          />
          </div>
          
          <div style={{textAlign:"center",marginRight:17}}>
          
        <Button 
        type='submit'
        variant="contained" 
        disabled={!isValueChanged}
        
        className={!isValueChanged?"buttonSettingsDisabled":"buttonSettings" }
        style={{marginTop:24}}>
          Update phone number
        </Button>
        <div style={{marginTop:15}}className='borderHorizontal' ></div> 
          <div   className={`WholeSettingsDeletePhoneOption `}>
          
          <div onClick={()=>setButtonClosePopup(true)} className={!props.darkMode?`settingsMenuOptionsLight`:`settingsMenuOptionsDark `}>
            
            <h2 style={{ fontWeight: 500, fontSize:18, color:"#c80815", textAlign:"center !important"}}>Delete phone number</h2>
        
          </div>
          </div>
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
                <form className={!props.darkMode? 'protectYourLarsLight':'protectYourLarsDark'}>
                      <Typography  className={!props.darkMode? "settingsModalHeaderCenteredLight":"settingsModalHeaderCenteredDark" } style={{ textAlign:"center"}} id="modal-modal-title" variant="h6" component="h2" >
                        Phone number updated!
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
          <Modal 
                open={buttonclosePopup}
                onClose={()=>setButtonClosePopup(false)}
                aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              keepMounted
              >
                                  <div style={{verticalAlign:'middle'}}>
                <form className={!props.darkMode? 'protectYourLarsLight':'protectYourLarsDark'}>
                      <Typography  className={!props.darkMode? "settingsModalHeaderLight":"settingsModalHeaderDark" } style={{ textAlign:"center"}} id="modal-modal-title" variant="h6" component="h2" >
                      Delete phone number?
                      </Typography>
                      <Typography className={!props.darkMode? "settingsModalParagraphLight":"settingsModalParagraphDark" } id="modal-modal-description" sx={{ mt: 2 }}>
                      This will remove this number from your account, and you will no longer be able to receive notifications or login codes to it. 
                        </Typography>
                 
                  <div style={{marginLeft:27}}>
                  <Button
                    className="profileDiscardContainerButton"
                    
                    onClick={() => {
                      setButtonClosePopup(false);
                      handleClickDelete();
                    }}
                  >
                    Delete
                  </Button>
                  <Button
                    className="profileCloseContainerButton"
                    onClick={() => setButtonClosePopup(false)}
                  >
                    Cancel
                  </Button>
                  </div>
                </form>
                </div>
              </Modal>

        </div>
     );
}

export default ChangePhoneNum;