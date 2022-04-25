import FollowingCard from "./FollowingCard";
import { NavLink } from "react-router-dom";
import "./Styles/CreateFollowing.css";
function CreateCard(props) {
  console.log(props);
  return (
    <div className="CreateFollowing">
      <FollowingCard contact={props.contact} />
    </div>
  );
}

export default CreateCard;
