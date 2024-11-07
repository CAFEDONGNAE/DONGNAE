import PropTypes from "prop-types";

const SelectedFriendItem = ({ friend, onDeselect }) => {
  return (
    <div
      onClick={() => onDeselect(friend.id)}
      style={{
        cursor: 'pointer',
        backgroundColor: '#111111',
        padding: '5px',
        border: '1px solid #ccc',
        marginBottom: '5px',
      }}
    >
      <p>{friend.name}</p>
    </div>
  );
};

SelectedFriendItem.propTypes = {
  friend: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onDeselect: PropTypes.func.isRequired
}

export default SelectedFriendItem;