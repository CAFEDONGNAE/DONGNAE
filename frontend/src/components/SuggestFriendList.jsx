import SuggestFriendCard from "./SuggestFriendCard";
import { useState, useEffect } from "react";
import { fetchSuggestFriends } from "../services/relationService";

const SuggestFriendList = () => {
  const [suggestFriendList, setSuggestFriendList] = useState([]);

  const handleSuggestFriendList = async () => {
    const loadSuggestFriendsResult = await fetchSuggestFriends();

    if (loadSuggestFriendsResult.success) {
      setSuggestFriendList(loadSuggestFriendsResult.data);
    } else {
      alert('추천 친구 목록 불러오기 실패')
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