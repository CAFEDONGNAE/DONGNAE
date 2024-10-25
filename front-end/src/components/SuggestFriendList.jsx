import mockApi from "../services/mockApi";
import SuggestFriendCard from "./SuggestFriendCard";
import { useState, useEffect } from "react";

const SuggestFriendList = () => {
  const [suggestFriendList, setSuggestFriendList] = useState([]);

  const handleSuggestFriendList = async () => {
    try {
      const response = await mockApi.get('/friends/suggest');

      if (response.status === 200) {
        console.log('친구목록 불러오기 성공', response);
        setSuggestFriendList(response.data.member);
      }
    } catch (error) {
      console.error('친구목록 불러오기 실패', error);
    }
  };

  useEffect(() => {
    handleSuggestFriendList();
  }, []);

  return (
    <div>
      <h3>추천 친구 목록 <span>{suggestFriendList.length}</span></h3>
      <ul>
        {suggestFriendList.map((friend, index) => (
          <li key={index}>
            <SuggestFriendCard friend={friend}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestFriendList;