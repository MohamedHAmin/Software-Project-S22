import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import "./Styles/SettingsMenu.css"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function ConfirmPassword(props) {
  //variable to check if password id entered correctly
  const[ispasswordCorrect,setPasswordCorrect]=useState(false);
  const[isClickedConfirm,setIsClickedConfirm]=useState(false);
  const [confirmPassValueError, setValueConfirmPassError] = useState(false);
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };
    
      const handleClickShowPassword = () => {
        setValues({
          ...values,
          showPassword: !values.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      //function to check on entered password
      const handleClickConfirmPass= () => {
        setValueConfirmPassError(false);
        if (values.password.length===0) {
        }
        if(values.password.length>0){
            setIsClickedConfirm(true);
          
          if(values.password==="karim"){
          setIsClickedConfirm(true);
          setPasswordCorrect(true);
          props.onConfirmPassChange()
          }
          else{
            setValueConfirmPassError(true);
          }
        }
      }
    
    return ( 
      <div >
        <h2 style={{marginTop:30}} className={!props.darkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" } >Confirm your password</h2>
        <p className={!props.darkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" }>Please enter your password in order to get this.</p>
        {/* recieve input password from usser */}
        
        <FormControl data-testid="passwordconfirm1" style={{marginTop:30, marginLeft:20}} sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" className={props.darkMode &&('forceChangePasswordMUIDarkMode')}>Password</InputLabel>
          <OutlinedInput
          
          inputProps={{className:props.darkMode &&('forceChangePasswordMUIDarkMode') }}
          helperText="The password you entered was incorrect."
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            error={confirmPassValueError}
            //helperText="The password you entered was incorrect."
          />
          {/* wait for user to click on button confirm */}
          <div style={{marginTop:15, marginLeft:163}}><Button onClick={handleClickConfirmPass} variant="contained">Confirm</Button></div>
        </FormControl> 
        {/* user clicks on button confirm but nothing entered */}
        {/* {isClickedConfirm===true && values.password.length===0 && <h4 className={!props.darkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" } style={{color:'#e53935'}}>Please enter your password!</h4>} */}
        {/* user clicks on button confirm but password incorrect */}
        {isClickedConfirm===true && ispasswordCorrect===false && (<h4 className={!props.darkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" } style={{color:'#e53935'}}>The password you entered was incorrect.</h4>)}
      </div>

  );
}

export default ConfirmPassword;