import FriendCard from "./FriendCard";
import { useState, useEffect } from "react";
import { fetchFriends } from "../services/friendService";

const FriendList = () => {
  const [friendList, setFriendList] = useState([]);

  const handleFriendList = async () => {
    const loadFriendsResult = await fetchFriends();

    if (loadFriendsResult.success) {
      setFriendList(loadFriendsResult.data.member);
    } else {
      alert('친구 목록 불러오기 실패');
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