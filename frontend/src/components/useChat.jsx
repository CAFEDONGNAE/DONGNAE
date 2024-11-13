import { useEffect, useRef } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import useAuthStore from '../store/authStore';

const useChat = (roomId) => {
  const stompClient = useRef(null);
  const userId = useAuthStore.getState().userId;

  useEffect(() => {
    // WebSocket 서버에 연결
    const socket = new SockJS('http://localhost:8080/chat');
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, () => {
      console.log('Connected to WebSocket');

      // 특정 채팅방을 구독
      stompClient.current.subscribe(`/topic/${roomId}`, (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log('Received message:', receivedMessage);
        // 메시지를 상태에 추가하는 로직 작성
      });
    });

    // 컴포넌트가 언마운트될 때 연결 해제
    return () => {
      if (stompClient.current && stompClient.current.connected) {
        console.log('>>> DISCONNECT');
        stompClient.current.disconnect(() => {
          console.log('Disconnected from WebSocket');
        });
      }
    };
  }, [roomId]);

  // 메시지 전송 함수
  const sendMessage = (content) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        `/app/chat/${roomId}/sendMessage`,
        {},
        JSON.stringify({
          content,
          writer: userId
        })
      );
    } else {
      console.error('WebSocket is not connected yet.');
    }
  };

  return { sendMessage };
};

export default useChat;
