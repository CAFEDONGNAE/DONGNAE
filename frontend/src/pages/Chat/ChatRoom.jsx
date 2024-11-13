import ChatRoomList from "../../components/ChatRoomList";
import CreateChatRoomModal from "../../components/CreateChatRoomModal";
import useModalStore from "../../store/modalStore";
import { useNavigate } from "react-router-dom";

const ChatRoom = () => {
  const { isCreateChatRoomModalOpen, openCreateChatRoomModal, closeCreateChatRoomModal } = useModalStore();
  const navigate = useNavigate();
  const createChatRoom = (chatRoomData) => {
    navigate(`/chatroom/${chatRoomData.roomId}`);
    closeCreateChatRoomModal();
  };

  return (
    <>
      <button onClick={openCreateChatRoomModal}>채팅방 생성</button>
      <CreateChatRoomModal
        isOpen={isCreateChatRoomModalOpen}
        onClose={closeCreateChatRoomModal}
        onCreate={createChatRoom}
      />
      <ChatRoomList />
    </>
  );
};

export default ChatRoom;