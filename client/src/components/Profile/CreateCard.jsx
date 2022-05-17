import FollowingCard from "./FollowingCard";

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
      <FollowingCard randomUser={props.randomUser} contact={props.contact} />
    </div>
  );
}

export default CreateCard;
