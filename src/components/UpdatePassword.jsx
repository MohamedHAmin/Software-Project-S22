import React, { useState } from 'react';
import './Styles/SubMenu.css'
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import "./Styles/SettingsMenu.css"
function UpdatePassword(props) {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
      const [values2, setValues2] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
      });
      const [values3, setValues3] = React.useState({
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

      const handleChange2 = (prop) => (event) => {
        setValues2({ ...values2, [prop]: event.target.value });
      };
    
      const handleClickShowPassword2 = () => {
        setValues2({
          ...values2,
          showPassword: !values2.showPassword,
        });
      };

      const handleChange3 = (prop) => (event) => {
        setValues3({ ...values3, [prop]: event.target.value });
      };
    
      const handleClickShowPassword3 = () => {
        setValues3({
          ...values3,
          showPassword: !values3.showPassword,
        });
      };
    
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
    
      
    
    return ( 
        <div >
        {/* <h1 className={props.isDarkMode? "settingsMenuHeaderLight":"settingsMenuHeaderDark" }>Account information</h1> */}
        <div ><FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" className={props.darkMode &&('forceChangePasswordMUIDarkMode')}>Current password</InputLabel>
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
        </FormControl></div>
        <div ><FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" className={props.darkMode &&('forceChangePasswordMUIDarkMode')}>New password</InputLabel>
          <OutlinedInput
            id2="outlined-adornment-password"
            type2={values2.showPassword ? 'text' : 'password'}
            value2={values2.password}
            onChange2={handleChange2('password')}
            endAdornment={
              <InputAdornment position2="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword2}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values2.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl></div>
        <div>
        <FormControl sx={{ m: 1, width: '40ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" className={props.darkMode &&('forceChangePasswordMUIDarkMode')}>Confirm password</InputLabel>
          <OutlinedInput
            id3="outlined-adornment-password3"
            type3={values3.showPassword ? 'text' : 'password'}
            value3={values3.password}
            onChange3={handleChange3('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword3}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values3.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        </div>
        <div>
        <Button variant="outlined" disabled className={props.darkMode &&('forceChangePasswordMUIDarkMode')} style={{marginLeft:283}}>
        save
      </Button>
        </div>
        
        </div>

     );
}

export default UpdatePassword;