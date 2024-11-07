import { useState } from 'react';
import PropTypes from 'prop-types';
import SelectFriendList from './SelectFriendList';

const CreateChatRoomModal = ({ isOpen, onClose, onCreate }) => {
  const [roomName, setRoomName] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);

  if (!isOpen) return null;

  const handleCreate = () => {
    if (roomName.trim() && selectedFriends.length > 0) {
      onCreate(roomName, selectedFriends);
      onClose();
    }
  }

  return (
    <section>
      <h2>채팅방 생성</h2>
      <input 
        type="text"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder='채팅방 이름을 입력하세요'
      />
      <h3>친구 선택</h3>
      <SelectFriendList onFriendSelect={setSelectedFriends} />
      <button onClick={handleCreate}>생성</button>
      <button onClick={onClose}>취소</button>
    </section>
  );
};

CreateChatRoomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
}

export default CreateChatRoomModal;