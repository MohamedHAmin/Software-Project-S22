import { PropaneSharp } from "@mui/icons-material";
import FollowerCard from "./FollowerCard";

function CreateFollower(props) {
  return <FollowerCard contact={props.contact} />;
}

export default CreateFollower;
