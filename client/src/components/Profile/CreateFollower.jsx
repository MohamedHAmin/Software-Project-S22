import FollowerCard from "./FollowerCard";

import "./Styles/CreateFollower.css";
/**
 *
 * @param {props} props Getting the information of my followers.
 * @returns Returns the card of my followers.
 */
function CreateFollower(props) {
  return (
    <div className="CreateFollower">
      <FollowerCard contact={props.contact} />
    </div>
  );
}

export default CreateFollower;
