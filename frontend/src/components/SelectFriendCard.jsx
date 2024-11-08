import PropTypes from "prop-types";
import { modalItem } from "../styles/modal.css";

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
      className={isSelected ? modalItem.defaultSelected : modalItem.default}
      onClick={() => onSelect(friend)}
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