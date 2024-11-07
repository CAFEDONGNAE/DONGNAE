import PropTypes from "prop-types";

const highlightText = (text, query) => {
  if (!query) {
    return text;
  }

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? <mark key={index}>{part}</mark> : part
  );
};

const SelectFriendCard = ({ friend, isSelected, onSelect, searchQuery }) => {
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
      <p>{highlightText(friend.name, searchQuery)}</p>
    </div>
  );
};

SelectFriendCard.propTypes = {
  friend: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
  searchQuery: PropTypes.string
};

export default SelectFriendCard;