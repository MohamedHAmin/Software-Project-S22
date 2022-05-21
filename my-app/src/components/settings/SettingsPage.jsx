import React, { useState, useEffect } from "react";
import "../../App.css";
import AccountSettings from "./AccountSettings";
import SettingsMenu from "./SettingsMenu";
import NotificationSettings from "./NotificationSettings";
import DisplaySettings from "./DisplaySettings";
import SideBar from "../Profile/SideBar";
import PrivacySettings from "./PrivacySettings";
import axios from "axios";
import { useParams } from "react-router-dom";
/**
 * Component for rendering the main Settings menu and the sub menu of the choosen option.
 * @component
 * @param {boolean} isDark 
 * @param {boolean} isAdmin
 * @param {function} onDarkModeChange
 * @example
 * prop.isDark = true
 * prop.isAdmin = false
 * const idItemSelected = 1 (Account settings)
 * return (
 * <div>
 *    <SideBar>
 *    <SettingsMenu>
 *    <AccountSettings>
 * </div>
 * )
 */
function SettingsPage(props) {
  /**
   * prop isDark to identify which mode the user wants dark/light.
   */
  const [isSelectedDarkMode, setDarkModeActive] = useState(props.isDark);
  function selectedDarkMode() {
    setDarkModeActive(!isSelectedDarkMode);
   /**
    * prop function onDarkModeChange() return the value of darkMode var to the App componenet.
    */
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
  const [darkMode, setDarkMode] = useState(false);
  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://larry-env.eba-u6mbx2gb.us-east-1.elasticbeanstalk.com/api/profile/${id}/me`, {
        headers: { Authorization: localStorage.getItem("accessToken") },
      })
      .then((res) => {
        console.log(res);
        if (res.error) {
          console.log("Error");
        } else {
          setDarkMode(res.data.darkMode);
        }
      });
  }, [id]);

  return (
    <div className="SettingsPage">
      <SideBar Settings isAdmin={props.isAdmin} darkMode={darkMode} newnotifications={props.newnotifications}/>
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
