import React from "react";
import "./Styles/SideBarIcon.css";
/**
 *
 * @param {props} props Getting some information about the Sidebar Icon as it's text,icon, and if it's active.
 * @returns Returning the sidebar icon.
 */
function SideBarIcon({ active, text, Icon }) {
  return (
    <div className={`sideBarIcon  ${active && "sideBarIcon--active"}`}>
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default SideBarIcon;
