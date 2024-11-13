import { useParams } from 'react-router-dom';

const ChatRoom = () => {
  const params = useParams();
  console.log(params);

  return (
    <>
      <h1>채팅방</h1>
    </>
  );
};

export default ChatRoom;