import React, { useState } from "react";
import "../../App.css";
import AccountSettings from "./AccountSettings";
import SettingsMenu from "./SettingsMenu";
import NotificationSettings from "./NotificationSettings";
import DisplaySettings from "./DisplaySettings";
import SideBar from "../Profile/SideBar";
import PrivacySettings from "./PrivacySettings";

function SettingsPage(props) {
  const [isSelectedDarkMode, setDarkModeActive] = useState(props.isDark);
  function selectedDarkMode() {
    setDarkModeActive(!isSelectedDarkMode);
    props.onDarkModeChange(!isSelectedDarkMode);
  }
  // dark mode var and its functions used to identify the state od display :Light or Dark
  function handleChangedDisplayMode() {
    selectedDarkMode();
  }
  function onDisplayDarkModeChanged() {
    handleChangedDisplayMode();
  }

  //var Id settings option selected from settings menu and its functions
  const [idItemSelected, setIdItemSelected] = useState(1);

  function handleChangeIdSelected(id) {
    setIdItemSelected(id);
  }
  function onItemSelectedChange(newid) {
    handleChangeIdSelected(newid);
  }
  return (
    <div className="SettingsPage">
      <SideBar Settings isAdmin={props.isAdmin} />
      <div className="karim">
        <div className="settingsMenu">
          <SettingsMenu
            isDarkMode={isSelectedDarkMode}
            onIdChange={onItemSelectedChange}
          />
        </div>
        <div className="subMenuDisplay">
          {idItemSelected === 1 && (
            <AccountSettings isDarkMode={isSelectedDarkMode} />
          )}
          {idItemSelected === 3 && (
            <PrivacySettings isDarkMode={isSelectedDarkMode} />
          )}
          {idItemSelected === 4 && (
            <NotificationSettings isDarkMode={isSelectedDarkMode} />
          )}
          {idItemSelected === 5 && (
            <DisplaySettings
              isDarkMode={isSelectedDarkMode}
              onDarkModeChanged={onDisplayDarkModeChanged}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default SettingsPage;
