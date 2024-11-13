import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ChatRoomCard = ({ chatRoom }) => {
  const navigate = useNavigate();

  const enterRoom = (roomId) => {
    navigate(`/chatroom/${roomId}`)
  }

  return (
    <div onClick={() => enterRoom(chatRoom.roomId)}>
      <p>{chatRoom.roomName}</p>
      <p>{chatRoom.roomId}</p>
      <p>{chatRoom.roomSize}</p>
    </div>
  );
};

ChatRoomCard.propTypes = {
  chatRoom: PropTypes.shape({
    roomName: PropTypes.string.isRequired,
    roomId: PropTypes.number.isRequired,
    roomSize: PropTypes.number.isRequired,
  }).isRequired
};

export default ChatRoomCard;