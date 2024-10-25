import mockApi from "../services/mockApi";
import FriendCard from "./FriendCard";
import { useState, useEffect } from "react";

const FriendList = () => {
  const [friendList, setFriendList] = useState([]);

  const handleFriendList = async () => {
    try {
      const response = await mockApi.get('/friends');

      if (response.status === 200) {
        console.log('친구목록 불러오기 성공', response);
        setFriendList(response.data.member);
      }
    } catch (error) {
      console.error('친구목록 불러오기 실패', error);
    }
  };

  useEffect(() => {
    handleFriendList();
  }, []);

  return (
    <div>
      <h3>친구 목록 <span>{friendList.length}</span></h3>
      <ul>
        {friendList.map((friend, index) => (
          <li key={index}>
            <FriendCard friend={friend}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;