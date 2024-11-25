import { useState, useEffect, useRef, useCallback } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import useAuthStore from '../store/authStore';
import { fetchChatRecords } from '../services/chatService';

const reconnectDelay = 5000; // 컴포넌트 밖으로 이동하여 안정적으로 유지

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  const stompClient = useRef(null);
  const subscriptionRef = useRef(null);
  const userId = useAuthStore.getState().userId;
  const userName = useAuthStore.getState().userName;

  const connect = useCallback(() => {
    if (stompClient.current && stompClient.current.connected) {
      return; // 이미 연결되어 있으면 새로운 연결을 생성하지 않음
    }

    const socket = new SockJS('http://localhost:8080/chat');
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect(
      {},
      async () => {
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

        // 이전 구독이 있으면 해제
        if (subscriptionRef.current) {
          subscriptionRef.current.unsubscribe();
        }

        // 토픽 구독
        if (stompClient.current && stompClient.current.connected) {
          subscriptionRef.current = stompClient.current.subscribe(
            `/topic/${roomId}`,
            (message) => {
              const receivedMessage = JSON.parse(message.body);
              setMessages((prevMessages) => [...prevMessages, receivedMessage]);
            }
          );
        }
      },
      (error) => {
        console.error('WebSocket connection error:', error);
        // 일정 시간 후 재연결 시도
        setTimeout(() => {
          console.log('Reconnecting...');
          connect();
        }, reconnectDelay);
      }
    );
  }, [roomId]);

  useEffect(() => {
    connect(); // WebSocket 연결 시도

    // 클린업 함수
    return () => {
      // 구독 해제
      if (subscriptionRef.current) {
        subscriptionRef.current.unsubscribe();
        subscriptionRef.current = null;
      }

      // STOMP 클라이언트 연결 해제
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
          writerId: userId,
        })
      );
    } else {
      console.error('WebSocket is not connected yet.');
    }
  };

  return { messages, sendMessage };
};

export default useChat;
