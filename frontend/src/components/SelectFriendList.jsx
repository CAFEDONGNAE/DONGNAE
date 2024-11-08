import { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import SelectFriendCard from './SelectFriendCard';
import { fetchFriends } from '../services/relationService';
import { useQuery } from '@tanstack/react-query';

const SelectFriendList = ({ selectedFriends, onFriendSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // const [filteredFriends, setFilteredFriends] = useState([]);

  const fetchFriendList = async () => {
    const loadFriendsResult = await fetchFriends();
    if (loadFriendsResult.success) {
      return loadFriendsResult.data;
    } else {
      throw new Error('친구 목록 불러오기 실패');
    }
  };
  
  const { data: friendList = [], isLoading, error } = useQuery({
      queryKey: ['friendList'],
      queryFn: fetchFriendList,
      staleTime: 1000 * 60 * 5
  });

  // 검색어에 따라 친구 목록 필터링
  // useEffect(() => {
  //   if (searchTerm.trim() === '') {
  //     setFilteredFriends(friendList);
  //   } else {
  //     const filtered = friendList.filter((f) =>
  //       f.name.toLowerCase().includes(searchTerm.toLowerCase())
  //     );
  //     setFilteredFriends(filtered);
  //   }
  // }, [searchTerm, friendList]);

  const filteredFriends = useMemo(() => {
    if (searchTerm.trim() === '') {
      return friendList;
    } else {
      return friendList.filter((f) =>
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }, [searchTerm, friendList]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>친구 목록을 불러오는 데 실패했습니다.</div>;

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="친구 이름 검색"
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
  onFriendSelect: PropTypes.func.isRequired,
};

export default SelectFriendList;