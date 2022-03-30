import React ,{ useState } from 'react';
import "./Styles/SideBar.css";
import SideBarIcon from './SideBarIcon';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ViewListIcon from '@mui/icons-material/ViewList';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LarryIcon from '../Images/Logo Default.png';
import {Button} from '@mui/material'



function SideBar(props)
{
  const [{isActive1,isActive2,isActive3,isActive4,isActive5,isActive6,isActive7,isActive8},setActive]=useState([true,false,false,false,false,false,false,false]);

  function Selected()
  { 
    setActive([true,false]);
  }
  return(
    <div className='sidebar'>
    
    <img className="sideBarLarryIcon" src={LarryIcon}/>
    
    <ul>
    <li onClick={Selected}> <SideBarIcon active={isActive1} text="Home" Icon={HomeIcon}/></li>
    <li onClick={Selected}><SideBarIcon active={isActive2}  text="Explore" Icon={SearchIcon}/></li>
    <li><SideBarIcon  text="Notifications" Icon={NotificationsIcon}/></li>
    <li><SideBarIcon text="Bookmark" Icon={BookmarkIcon}/></li>
    <li><SideBarIcon text="Message" Icon={ChatIcon}/></li>
    <li><SideBarIcon text="List" Icon={ViewListIcon}/></li>
    <li><SideBarIcon text="Profile" Icon={AccountBoxIcon}/></li>
    <li><SideBarIcon text="More" Icon={MoreHorizIcon}/></li>
    </ul>
    <Button className="sideBarTweet"  variant="outlined" fullWidth onClick={props.tweetAdd}>Lar
    </Button>
    </div>
  )
}

export default SideBar