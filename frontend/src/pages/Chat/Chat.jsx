import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import useChat from '../../components/useChat';
import useAuthStore from '../../store/authStore';
import { chatItem, chatContainer } from '../../styles/chat.css';

const Chat = () => {
  const { roomId } = useParams();
  const { messages, sendMessage } = useChat(roomId);
  const [message, setMessage] = useState('');
  const userId = useAuthStore.getState().userId;
  // const userName = useAuthStore.getState().userName;
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <section style={{
      display: 'flex',
      flexDirection: 'column',
      height: '90vh'
    }}>
      <h1 style={{flex: '0 0 auto'}}>채팅방</h1>
      <div
        style={{
          flex: '1 1 auto',
          overflowY: 'auto'
        }}
      >
        {messages.map((msg, index) => (
          <div  key={index} className={msg.writerId === userId ? chatContainer.my : chatContainer.others}>
            {msg.writerId !== userId && index === 0 && (<p>{msg.writer}</p>)}
            {msg.writerId !== userId && index !== 0 && messages[index - 1].writerId !== msg.writerId && (<p>{msg.writer}</p>)}
            <div className={msg.writerId === userId ? chatItem.my : chatItem.others}>
              <span>{msg.content}</span>
            </div>
          </div>
        ))}
        <div ref={chatEndRef}/>
      </div>
      <form
        onSubmit={handleSendMessage}
        style={{flex: '0 0 auto'}}
      >
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='메시지를 입력하세요'
        />
        <button onClick={handleSendMessage}>전송</button>
      </form>
    </section>
  );
};

export default Chat;