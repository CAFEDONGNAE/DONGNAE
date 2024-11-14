import { useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import useAuthStore from '../store/authStore';
import { fetchChatRecords } from '../services/chatService';

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);
  const userId = useAuthStore.getState().userId;
  const userName = useAuthStore.getState().userName;
  const reconnectDelay = 5000; // 재연결 시도 지연 시간

  const connect = useCallback(() => {
    const socket = new SockJS('http://localhost:8080/chat');
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect({}, async () => {
      console.log('Connected to Websocket');

      // 이전 채팅 내역 가져오기
      try {
        const { success, data } = await fetchChatRecords(roomId);
        if (success) {
          setMessages(data);
        }
      } catch (error) {
        console.error('채팅 내역 불러오기 실패', error);
      }

      // 연결이 완료된 후에만 구독 실행
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.subscribe(`/topic/${roomId}`, (message) => {
          const receivedMessage = JSON.parse(message.body);
          
          // 새로운 메세지를 상태에 추가
          setMessages((prevMessages) => [...prevMessages, receivedMessage]);
        });
      }
    },
    (error) => {
      console.error('WebSocket connection error:', error);
      // 연결이 실패하거나 끊어졌을 경우 일정 시간 후 재연결 시도
      setTimeout(() => {
        console.log('Reconnecting...');
        connect();
      }, reconnectDelay);
    });
  }, [roomId, reconnectDelay]);

  useEffect(() => {
    connect(); // WebSocket 연결 시도

    // 컴포넌트가 언마운트될 때 연결 해제
    return () => {
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.disconnect(() => {
          console.log('Disconnected from WebSocket');
        });
      }
    };
  }, [connect]);

  // 메시지 전송 함수
  const sendMessage = (content) => {
    if (stompClient.current && stompClient.current.connected) {
      stompClient.current.send(
        `/app/chat/${roomId}/sendMessage`,
        {},
        JSON.stringify({
          content,
          writer: userName,
          writerId: userId
        })
      );
    } else {
      console.error('WebSocket is not connected yet.');
    }
  };

  return { messages, sendMessage };
};

export default useChat;
