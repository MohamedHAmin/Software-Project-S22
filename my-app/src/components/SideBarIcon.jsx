import React from 'react';
import "./Styles/SideBarIcon.css"

function SideBarIcon({active,text,Icon})
{
  return(
    <div className={`sideBarIcon  ${active && "sideBarIcon--active"}` } >
    <Icon/>
    <h2>{text}</h2>
    </div>
  )
}

export default SideBarIcon