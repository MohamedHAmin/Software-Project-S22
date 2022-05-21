import React ,{ useState } from 'react';
import "./Styles/Header.css";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
/**
 * this function renders the Homepage header
 * @returns The Header of the page  
 */
function Header(){    
    return(
        <div className='Header'>
            <header className='header2'>
                Home <AutoAwesomeIcon className='AutoAwsPhoto'  /> 
            </header>
        </div>
    );
}
export default Header;