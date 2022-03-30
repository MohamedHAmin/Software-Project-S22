import React  from 'react';
import "./Styles/SideBar.css";
import SideBarIcon from './SideBarIcon';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LarryIcon from '../Images/Logo Default.png';
import {Button} from '@mui/material'



function SideBar({Home,Search,Notifications,Profile,Bookmark})
{
  return(
    <div className='sidebar'>
    
    <img className="sideBarLarryIcon" alt="Larry Icon" src={LarryIcon}/>
    
    <ul>
    <li><SideBarIcon active={Home} text="Home" Icon={HomeIcon}/></li>
    <li><SideBarIcon active={Search} text="Explore" Icon={SearchIcon}/></li>
    <li><SideBarIcon active={Notifications} text="Notifications" Icon={NotificationsIcon}/></li>
    <li><SideBarIcon active={Bookmark} text="Bookmark" Icon={BookmarkIcon}/></li>
    <li><SideBarIcon active={Profile} text="Profile" Icon={AccountBoxIcon}/></li>
    <li><SideBarIcon text="More" Icon={MoreHorizIcon}/></li>
    </ul>
    <Button className="sideBarTweet"  variant="outlined" fullWidth>Lar
    </Button>
    </div>
  )
}

export default SideBar