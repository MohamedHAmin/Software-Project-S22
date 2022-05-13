import FollowingCard from "./FollowingCard";
import { NavLink } from "react-router-dom";
import "./Styles/CreateFollowing.css";
/**
 *
 * @param {props} props Getting the information of the people i follow.
 * @returns Returns the card of the people i follow.
 */
function CreateCard(props) {
  console.log(props);
  return (
    <div className="CreateFollowing">
      <FollowingCard contact={props.contact} />
    </div>
  );
}

export default CreateCard;
