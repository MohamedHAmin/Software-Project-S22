import React from "react";
import "./Styles/SideBar.css";
import SideBarIcon from "./SideBarIcon";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LarryIcon from "../../Images/Logo Default.png";
import LarryIconDark from "../../Images/Logo Dark Mode.png";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router-dom";

function SideBar({ Home, Search, Notifications, Profile, Settings, Logout }) {
  return (
    <div className="sidebar">
      <img className="sideBarLarryIcon" alt="Larry Icon" src={LarryIcon} />

      <ul>
        <li>
          <NavLink to="/Home">
            <SideBarIcon active={Home} text="Home" Icon={HomeIcon} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/Home">
            <SideBarIcon active={Search} text="Explore" Icon={SearchIcon} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/Home">
            <SideBarIcon
              active={Notifications}
              text="Notifications"
              Icon={NotificationsIcon}
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="/Settings">
            <SideBarIcon
              active={Settings}
              text="Settings"
              Icon={SettingsIcon}
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="/Profile">
            <SideBarIcon
              active={Profile}
              text="Profile"
              Icon={AccountBoxIcon}
            />
          </NavLink>
        </li>
        <li>
          <NavLink to="/Home">
            <SideBarIcon text="More" Icon={MoreHorizIcon} />
          </NavLink>
        </li>
      </ul>
      <Button className="sideBarTweet" variant="outlined" fullWidth>
        Lar
      </Button>
      <div className="logoutIcon">
        <NavLink to="/Logout">
          <SideBarIcon active={Logout} text="Logout" Icon={LogoutIcon} />
        </NavLink>
      </div>
    </div>
  );
}
export default SideBar;
