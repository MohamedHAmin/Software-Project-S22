import React ,{ useState } from 'react';
import "./Styles/Header.css";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
function Header(){
     
    return(
        <div className='Header'>
        <header>
        Home <AutoAwesomeIcon className='AutoAwsPhoto'  /> 
        </header>
</div>
    );
}
export default Header;