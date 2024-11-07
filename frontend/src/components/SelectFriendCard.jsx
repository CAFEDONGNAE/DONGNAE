import PropTypes from "prop-types";

const SelectFriendCard = ({ friend, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(friend)}
      style={{
        cursor: 'pointer',
        backgroundColor: isSelected ? '#222222' : 'black',
        padding: '10px',
        marginBottom: '5px',
      }}
    >
      <p>{friend.name}</p>
    </div>
  );
};

SelectFriendCard.propTypes = {
  friend: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired
};

export default SelectFriendCard;