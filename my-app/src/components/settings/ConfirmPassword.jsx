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
function ConfirmPassword(props) {
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
    
    
    return ( 
      <div className="settingsSubMenu">
        <h2 style={{marginTop:30}} className={!props.darkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" } >Confirm your password</h2>
        <p className={!props.darkMode? "settingsMenuParagraphLight":"settingsMenuParagraphDark" }>Please enter your password in order to get this.</p>
        {/* recieve input password from usser */}
        
        <FormControl  style={{marginTop:30, marginLeft:20}} sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" className={props.darkMode &&('forceChangePasswordMUIDarkMode')}>Password</InputLabel>
          <OutlinedInput
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
          />
          <div style={{marginTop:15, marginLeft:163}}><Button variant="contained">Confirm</Button></div>
        </FormControl> 
        {/* wait for user to click on button confirm */}
        
      </div>

  );
}

export default ConfirmPassword;