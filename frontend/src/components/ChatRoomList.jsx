import { useState, useEffect } from "react";
import { fetchChatRooms } from "../services/chatService";
import ChatRoomCard from "./ChatRoomCard";

const ChatRoomList = () => {
  const [chatRooms, setChatRooms] = useState([]);

  const loadChatRoom = async () => {
    const fetchResult = await fetchChatRooms();

    if (fetchResult.success) {
      setChatRooms(fetchResult.data);
    } else {
      console.log('fail');
    }
  };

  useEffect(() => {
    loadChatRoom();
  }, []);

  return (
    <ul>
      {chatRooms.map((chatRoom) => (
        <li key={chatRoom.roomId}>
          <ChatRoomCard
            chatRoom={chatRoom}
          />
        </li>
      ))}
    </ul>
  );
};

export default ChatRoomList;