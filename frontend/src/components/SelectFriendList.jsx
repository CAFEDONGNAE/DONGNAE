import { useState, useEffect } from 'react';
import SelectFriendCard from './SelectFriendCard';
import { fetchFriends } from '../services/relationService';
import PropTypes from 'prop-types';

const SelectFriendList = ({ onFriendSelect }) => {
  const [friendList, setFriendList] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  useEffect(() => {
    // 친구 리스트를 불러오기
    const handleFriendList = async () => {
      const loadFriendsResult = await fetchFriends();

      if (loadFriendsResult.success) {
        setFriendList(loadFriendsResult.data);
      } else {
        console.log('친구 목록 불러오기 실패');
      }
    };

    handleFriendList();
  }, []);

  const handleSelectFriend = (friendId) => {
    setSelectedFriends((prevSelected) =>
      prevSelected.includes(friendId)
        ? prevSelected.filter((id) => id !== friendId) // 선택 해제
        : [...prevSelected, friendId] // 선택 추가
    );
  };

  // 선택된 친구를 부모 컴포넌트에 전달
  useEffect(() => {
    onFriendSelect(selectedFriends);
  }, [selectedFriends, onFriendSelect]);

  return (
    <div>
      {friendList.map((friend) => (
        <SelectFriendCard
          key={friend.id}
          friend={friend}
          isSelected={selectedFriends.includes(friend.id)}
          onSelect={handleSelectFriend}
        />
      ))}
    </div>
  );
};

SelectFriendList.propTypes = {
  onFriendSelect: PropTypes.func.isRequired
}

export default SelectFriendList;
