import { useState, useEffect } from 'react';
import SelectFriendCard from './SelectFriendCard';
import { fetchFriends } from '../services/relationService';
import PropTypes from 'prop-types';

const SelectFriendList = ({ selectedFriends, onFriendSelect }) => {
  const [friendList, setFriendList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFriends, setFilteredFriends] = useState([]);

  useEffect(() => {
    // 친구 리스트를 불러오기
    const handleFriendList = async () => {
      const loadFriendsResult = await fetchFriends();

      if (loadFriendsResult.success) {
        setFriendList(loadFriendsResult.data);
        setFilteredFriends(loadFriendsResult.data);
      } else {
        console.log('친구 목록 불러오기 실패');
      }
    };

    handleFriendList();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredFriends(friendList);
    } else {
      const filtered = friendList.filter((f) => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredFriends(filtered);
    }
  }, [searchTerm, friendList]);

  return (
    <div>
      <input 
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='친구 이름 검색'
      />
      <h4>친구 {filteredFriends.length}</h4>
      {filteredFriends.map((friend) => (
        <SelectFriendCard
          key={friend.id}
          friend={friend}
          isSelected={selectedFriends.some((f) => f.id === friend.id)}
          onSelect={onFriendSelect}
          searchQuery={searchTerm}
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
