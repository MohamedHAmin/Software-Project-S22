import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AccountSettings from "./AccountSettings";
import "./Styles/SettingsMenu.css";
import SettingsMenuOptions from "./SettingsMenuOptions";
import KeyIcon from "@mui/icons-material/Key";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Homepage from "../Homepage/Homepage";
/**
 * component to display the menu of settings and let the user choose from it the option he needs.
 * But it does not show the sub menu (it just send the id of selected option),
 * because it is instead SettingsPage role.
 * @component
 * @param {boolean} isDarkMode
 * @param {function} onIdChange
 * @example
 * props.isDarkMode = true
 * const isclickedAcc = true
 * return (
 * <div>
 *    <SettingsMenuOptions account>
 *    <SettingsMenuOptions Larry blue>
 *    <SettingsMenuOptions privacy>
 *    ...
 * </div>
 * )
 *  
 */
function SettingsMenu(props) {
  const [isclickedAcc, setAccActive] = useState(true);
  const [isclickedSecurity, setSecurActive] = useState(false);
  const [isclickedPrivacy, setPrivacyActive] = useState(false);
  const [isclickedNotifications, setNotificationActive] = useState(false);
  const [isclickedAccessibility, setAccessibilityActive] = useState(false);
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    marginBottom: 20,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));
  function clickedAccount() {
    setAccActive(true);
    setSecurActive(false);
    setPrivacyActive(false);
    setNotificationActive(false);
    setAccessibilityActive(false);
    props.onIdChange(1);
  }
  function clickedSecurity() {
    setAccActive(false);
    setSecurActive(true);
    setPrivacyActive(false);
    setNotificationActive(false);
    setAccessibilityActive(false);
    props.onIdChange(2);
  }
  function clickedPrivacy() {
    setAccActive(false);
    setSecurActive(false);
    setPrivacyActive(true);
    setNotificationActive(false);
    setAccessibilityActive(false);
    props.onIdChange(3);
  }
  function clickedNotifications() {
    setAccActive(false);
    setSecurActive(false);
    setPrivacyActive(false);
    setNotificationActive(true);
    setAccessibilityActive(false);
    props.onIdChange(4);
  }
  function clickedAccessibility() {
    setAccActive(false);
    setSecurActive(false);
    setPrivacyActive(false);
    setNotificationActive(false);
    setAccessibilityActive(true);
    props.onIdChange(5);
  }
  return (
    <div>
      <h1
        className={
          !props.isDarkMode
            ? "settingsMenuHeaderLight"
            : "settingsMenuHeaderDark"
        }
      >
        Settings
      </h1>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      {/* Routing from Nav bar in login main screen*/}

      <div>
        <div>
          {/* <NavLink to="/Settings/account"></NavLink> */}
          <div onClick={clickedAccount}>
            <SettingsMenuOptions
              id="1"
              darkMode={props.isDarkMode}
              active={isclickedAcc}
              Icon={KeyIcon}
              text="Your account"
            />{" "}
          </div>
          <NavLink to="/Home">
            <div>
              <SettingsMenuOptions
                id="2"
                darkMode={props.isDarkMode}
                active={isclickedSecurity}
                Icon={KeyIcon}
                text="Larry blue"
              />{" "}
            </div>{" "}
          </NavLink>
          <div onClick={clickedPrivacy}>
            <SettingsMenuOptions
              id="3"
              darkMode={props.isDarkMode}
              active={isclickedPrivacy}
              Icon={KeyIcon}
              text="Privacy and safety"
            />{" "}
          </div>
          <div onClick={clickedNotifications}>
            <SettingsMenuOptions
              id="4"
              darkMode={props.isDarkMode}
              active={isclickedNotifications}
              Icon={KeyIcon}
              text="Notifications"
            />{" "}
          </div>
          <div onClick={clickedAccessibility}>
            <SettingsMenuOptions
              id="5"
              darkMode={props.isDarkMode}
              active={isclickedAccessibility}
              Icon={KeyIcon}
              text="Accessibility, display, and languages"
            />{" "}
          </div>
        </div>
      </div>
      <div>
        <div>
          <Routes>
            <Route path="/Home" element={<Homepage />}></Route>
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default SettingsMenu;
