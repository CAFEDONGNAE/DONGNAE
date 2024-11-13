import { useParams } from 'react-router-dom';
import { useState } from 'react';
import useChat from '../../components/useChat';

const Chat = () => {
  const { roomId } = useParams();
  const { sendMessage } = useChat(roomId);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <>
      <h1>채팅방</h1>
      <div>
        <p>채팅 메세지 표시</p>
      </div>
      <input
        type='text'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='메시지를 입력하세요'
      />
      <button onClick={handleSendMessage}>전송</button>
    </>
  );
};

export default Chat;