import PropTypes from "prop-types";
import { modalItem } from "../styles/modal.css";

const SelectedFriendItem = ({ friend, onDeselect }) => {
  return (
    <div
      className={ modalItem.mini }
      onClick={() => onDeselect(friend.id)}
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