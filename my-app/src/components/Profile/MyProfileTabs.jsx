import React from "react";
import { Tabs, Tab, Box } from "@mui/material";
import { NavLink } from "react-router-dom";
import "./Styles/MyProfileTabs.css";
function MyProfileTabs() {
  return (
    <Box className="myProfileTabs">
      <Tabs centered>
        <NavLink className="myProfileNavLink" to="/Profile">
          <Tab value={0} className="myProfileTab" label="Tweets" />
        </NavLink>
        <NavLink className="myProfileNavLink" to="/Profile/with_replies">
          <Tab value={1} className="myProfileTab" label="Tweets & replies" />
        </NavLink>
        <NavLink className="myProfileNavLink" to="/Profile/media">
          <Tab value={2} className="myProfileTab" label="Media" />
        </NavLink>
        <NavLink className="myProfileNavLink" to="/Profile/likes">
          <Tab value={3} className="myProfileTab" label="Likes" />
        </NavLink>
      </Tabs>
    </Box>
  );
}
export default MyProfileTabs;
