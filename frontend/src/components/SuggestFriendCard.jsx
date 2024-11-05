import PropTypes from "prop-types";
import FriendAddButton from "./FriendAddButton";

const SuggestFriendCard = ({ friend }) => {
  return (
    <div>
      <p>{friend.name}</p>
      <p>{friend.email}</p>
      <FriendAddButton id={friend.id}/>
    </div>
  );
};

SuggestFriendCard.propTypes = {
  friend: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default SuggestFriendCard;