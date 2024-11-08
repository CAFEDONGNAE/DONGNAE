import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SelectFriendList from './SelectFriendList';
import SelectedFriendItem from './SelectedFriendItem';
// import { createChatRoom } from '../services/chatService';
import { modalOverlay, modalContainer, modalHeader, modalContent, modalActions } from '../styles/modal.css';

const CreateChatRoomModal = ({ isOpen, onClose, onCreate }) => {
  const [roomName, setRoomName] = useState('');
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [isCustomName, setIsCustomName] = useState(false);

  useEffect(() => {
    if (selectedFriends.length > 0 && !isCustomName) {
      const defaultName = selectedFriends.map((f) => f.name).join(', ');
      setRoomName(defaultName);
    }
  }, [selectedFriends, isCustomName]);

  if (!isOpen) return null;

  const handleCreate = async () => {
    if (roomName.trim() && selectedFriends.length > 0) {
      const memberId = selectedFriends.map(friend => friend.id);
      // const createResult = await createChatRoom(memberId, roomName);
      
      // if (createResult) {
      //   setRoomName('');
      //   setSelectedFriends([]);
      //   onClose();
      // } else {
      //   alert('채팅방 생성 실패');
      // }
      onCreate(roomName, memberId);
      setRoomName('');
      setSelectedFriends([]);
      onClose();
    }
  };

  const handleRoomNameChange = (e) => {
    const value = e.target.value;
    if (value === '') {
      setIsCustomName(false);
    } else {
      setIsCustomName(true);
    }
    setRoomName(value);
  }

  const handleDeselectFriend = (friendId) => {
    setSelectedFriends((prevSelected) => {
      return prevSelected.filter((f) => f.id !== friendId)
    });
  };

  return (
    <div
      className={modalOverlay}
      onClick={onClose}
    >
      <section
        className={modalContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={modalHeader}>채팅방 생성</h2>
        <input 
          type="text"
          value={roomName}
          onChange={handleRoomNameChange}
          placeholder='채팅방 이름을 입력하세요'
        />
        <div className={modalContent}>
          <h4>친구 선택 {selectedFriends.length > 0 && selectedFriends.length}</h4>
          <div>
            {selectedFriends.length > 0 && (
              <>
                {selectedFriends.map((friend) => (
                  <SelectedFriendItem 
                    key={friend.id}
                    friend={friend}
                    onDeselect={handleDeselectFriend}
                  />
                ))}
              </>
            )}
          </div>
          <SelectFriendList
            selectedFriends={selectedFriends}
            onFriendSelect={(friend) => {
              setSelectedFriends((prevSelected) => {
                const isAlreadySelected = prevSelected.some((f) => f.id === friend.id);
                if (isAlreadySelected) {
                  return prevSelected.filter((f) => f.id !== friend.id);
                } else {
                  return [...prevSelected, friend];
                }
              });
            }}
          />
        </div>
        <div className={modalActions}>
          <button onClick={handleCreate}>생성</button>
          <button onClick={onClose}>취소</button>
        </div>
      </section>
    </div>
  );
};

CreateChatRoomModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired
}

export default CreateChatRoomModal;