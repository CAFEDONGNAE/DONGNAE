// import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import UserFinder from '../../components/UserFinder';
import CreateChatRoomModal from '../../components/CreateChatRoomModal';
import useModalStore from '../../store/modalStore';

const Home = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { isCreateChatRoomModalOpen, openCreateChatRoomModal, closeCreateChatRoomModal } = useModalStore();

  const createChatRoom = (roomName, selectedFriends) => {
    console.log(`채팅방 생성: ${roomName}`);
    console.log(`채팅방 참여자: ${selectedFriends}`)
    closeCreateChatRoomModal();
  }

  return (
    <>
      <div>
        <p>서울 관악구 남부순환로 1600-1</p>
      </div>
      { isLoggedIn &&
        <>
          <button onClick={openCreateChatRoomModal}>채팅방 생성</button>
          <CreateChatRoomModal
            isOpen={isCreateChatRoomModalOpen}
            onClose={closeCreateChatRoomModal}
            onCreate={createChatRoom}
          />
          <UserFinder />
        </>
      }
    </>
  );
};

export default Home;