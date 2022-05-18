import SearchFollowers from "./SearchFollowers";
import { NavLink } from "react-router-dom";
import "./Styles/CreateFollower.css";
/**
 *
 * @param {props} props Getting the information of my followers.
 * @returns Returns the card of my followers.
 */
function CreateSearchCard(props) {
  return (
    <div className="CreateFollower">
      <SearchFollowers contact={props} />
    </div>
  );
}

export default CreateSearchCard;
