import React from 'react';
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
import {Button} from '@mui/material';

function SideBar()
{
  return(
    <div className='sidebar'>
    <img className="sideBarLarryIcon" src={LarryIcon}/>
    <SideBarIcon active text="Home" Icon={HomeIcon}/>
    <SideBarIcon text="Explore" Icon={SearchIcon}/>
    <SideBarIcon text="Notifications" Icon={NotificationsIcon}/>
    <SideBarIcon text="Message" Icon={ChatIcon}/>
    <SideBarIcon text="Bookmark" Icon={BookmarkIcon}/>
    <SideBarIcon text="List" Icon={ViewListIcon}/>
    <SideBarIcon text="Profile" Icon={AccountBoxIcon}/>
    <SideBarIcon text="More" Icon={MoreHorizIcon}/>
    <Button className="sideBarTweet"  variant="outlined" fullWidth>Tweet
    </Button>
    </div>
  )
}

export default SideBar