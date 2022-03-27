import React ,{ useState } from 'react';
import "./Styles/Header.css";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
function Header(){
    var x= <header> Home <AutoAwesomeIcon className='AutoAwsPhoto'  /> </header>
    return(
        <div className='Header'>
             {x}
        </div>

    );
}
export default Header;