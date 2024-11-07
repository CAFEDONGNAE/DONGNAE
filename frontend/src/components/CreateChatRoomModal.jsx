import { useState } from 'react';
import PropTypes from 'prop-types';

const CreateChatRoomModal = ({ isOpen, onClose, onCreate }) => {
  const [roomName, setRoomName] = useState('');

  if (!isOpen) return null;

  const handleCreate = () => {
    if (roomName.trim()) {
      onCreate(roomName);
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
      <h3>친구 목록</h3>
      <ul>
        <li>친구 1..</li>
      </ul>
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