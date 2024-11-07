import { useState, useEffect } from 'react';
import SelectFriendCard from './SelectFriendCard';
import { fetchFriends } from '../services/relationService';
import PropTypes from 'prop-types';

const SelectFriendList = ({ selectedFriends, onFriendSelect }) => {
  const [friendList, setFriendList] = useState([]);

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

  return (
    <div>
      {friendList.map((friend) => (
        <SelectFriendCard
          key={friend.id}
          friend={friend}
          isSelected={selectedFriends.some((f) => f.id === friend.id)}
          onSelect={onFriendSelect}
        />
      ))}
    </div>
  );
};

SelectFriendList.propTypes = {
  selectedFriends: PropTypes.array.isRequired,
  onFriendSelect: PropTypes.func.isRequired
}

export default SelectFriendList;
