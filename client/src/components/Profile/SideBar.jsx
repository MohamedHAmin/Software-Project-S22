import React from "react";
import "./Styles/SideBar.css";
import SideBarIcon from "./SideBarIcon";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LarryIcon from "../../Images/Logo Default.png";
import DashboardIcon from "@mui/icons-material/DashboardRounded";
import LarryIconDark from "../../Images/Logo Dark Mode.png";
import { Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ReportIcon from '@mui/icons-material/OutlinedFlagSharp';
import { NavLink } from "react-router-dom";
/**
 *
 * @param {props} props Getting which page is active and if it's the admin.
 * @returns Returns the SideBar
 */
function SideBar({
  Home,
  Search,
  Notifications,
  Profile,
  Settings,
  Logout,
  isAdmin,
  darkMode,
  Reports,
  Dashboard,
  newnotifications
}) {
  let id = localStorage.getItem("userId");
  return (
    <div className="sidebar">
      {!darkMode ? (
        <img className="sideBarLarryIcon" alt="Larry Icon" src={LarryIcon} />
      ) : (
        <img
          className="sideBarLarryIcon"
          alt="Larry Icon"
          src={LarryIconDark}
        />
      )}

      <ul>
        <li>
          <NavLink to="/Home">
            <SideBarIcon active={Home} text="Home" Icon={HomeIcon} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/Explore">
            <SideBarIcon active={Search} text="Explore" Icon={SearchIcon} />
          </NavLink>
        </li>
        <li>
          {!newnotifications && <NavLink to="/Notifications">
              <SideBarIcon
                active={Notifications}
                text="Notifications"
                Icon={NotificationsIcon}
              />
            </NavLink>
          }
          {newnotifications && <NavLink to="/Notifications">
              <SideBarIcon
                active={Notifications}
                text="Notifications"
                Icon={NotificationsActiveIcon}
              />
            </NavLink>
          }
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
          <NavLink to={`/Profile/${id}`}>
            <SideBarIcon
              active={Profile}
              text="Profile"
              Icon={AccountBoxIcon}
            />
          </NavLink>
        </li>
        <li>
        {isAdmin && (
            <NavLink to="/ReportsPage">
              <SideBarIcon
                active={Reports}
                text="Reports"
                Icon={ReportIcon}
              />
            </NavLink>
          )}
        </li>
        <li>
          {isAdmin && (
            <NavLink to="/Admin/Dashboard">
            <SideBarIcon
            active={Dashboard}
             text="Dashboard" 
             Icon={DashboardIcon} />
          </NavLink>
          )}
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
