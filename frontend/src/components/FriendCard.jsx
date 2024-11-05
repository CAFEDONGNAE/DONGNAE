import PropTypes from "prop-types";

const FriendCard = ({ friend }) => {
  return (
    <div>
      <p>{friend.name}</p>
      <p>{friend.email}</p>
    </div>
  );
};

FriendCard.propTypes = {
  friend: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default FriendCard;