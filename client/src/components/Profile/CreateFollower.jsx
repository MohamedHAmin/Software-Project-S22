import FollowerCard from "./FollowerCard";
import { NavLink } from "react-router-dom";
import "./Styles/CreateFollower.css";
function CreateFollower(props) {
  return (
    <div className="CreateFollower">
      <FollowerCard contact={props.contact} />
    </div>
  );
}

export default CreateFollower;
