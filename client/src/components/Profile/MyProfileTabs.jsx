import React from "react";
import { Tab, Box } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";
import "./Styles/MyProfileTabs.css";
/**
 *
 * @returns Returns the tabs appearing on the profile page.
 */
function MyProfileTabs(props) {
  let { id } = useParams();
  return (
    <Box className="myProfileTabs">
      <NavLink className="myProfileNavLink" to={`/Profile/${id}`}>
        <Tab
          value={0}
          className={props.Tweets ? "myProfileTab-active" : "myProfileTab"}
          label="Tweets"
        />
      </NavLink>
      <NavLink className="myProfileNavLink" to={`/Profile/${id}/with_replies`}>
        <Tab
          value={1}
          className={props.Replies ? "myProfileTab-active" : "myProfileTab"}
          label="Tweets & replies"
        />
      </NavLink>
      <NavLink className="myProfileNavLink" to={`/Profile/${id}/media`}>
        <Tab
          value={2}
          className={props.Media ? "myProfileTab-active" : "myProfileTab"}
          label="Media"
        />
      </NavLink>
      <NavLink className="myProfileNavLink" to={`/Profile/${id}/likes`}>
        <Tab
          value={3}
          className={props.Likes ? "myProfileTab-active" : "myProfileTab"}
          label="Likes"
        />
      </NavLink>
    </Box>
  );
}
export default MyProfileTabs;
