import PropTypes from "prop-types";

const SelectFriendCard = ({ friend, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(friend.id)}
      style={{
        cursor: 'pointer',
        backgroundColor: isSelected ? '#d3d3d3' : 'white',
        padding: '10px',
        border: '1px solid #ccc',
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