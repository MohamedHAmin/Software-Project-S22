import React  from 'react';
import "./Styles/SideBar.css";
import SideBarIcon from './SideBarIcon';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LarryIcon from '../../Images/Logo Default.png';
import {Button} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'

function SideBar({Home,Search,Notifications,Profile,Settings,Logout})
{   
  return(
    <div className='sidebar'>
      
      <img className="sideBarLarryIcon" alt="Larry Icon" src={LarryIcon}/>
      
      <ul> 
          <li><a href='/Home'><SideBarIcon active={Home} text="Home" Icon={HomeIcon}/></a></li>
          <li ><a href='/home'><SideBarIcon active={Search} text="Explore" Icon={SearchIcon}/></a></li>
          <li><a href='/home'><SideBarIcon active={Notifications} text="Notifications" Icon={NotificationsIcon}/></a></li>
          <li><a href='/Settings'><SideBarIcon active={Settings} text="Settings" Icon={SettingsIcon}/></a></li>
          <li><a href='/Profile'><SideBarIcon active={Profile} text="Profile" Icon={AccountBoxIcon}/></a></li>
          <li><a href='/home'><SideBarIcon text="More" Icon={MoreHorizIcon}/></a></li>
      </ul>
      <Button className="sideBarTweet"  variant="outlined" fullWidth>Lar</Button>
      <div className='logoutIcon'><a href="/Logout"><SideBarIcon active={Logout} text="Logout" Icon={LogoutIcon}/></a></div> 
    </div>
);
}
export default SideBar