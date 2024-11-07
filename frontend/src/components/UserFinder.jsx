import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import UserFinderCard from './UserFinderCard';
import { searchUsersApi } from '../services/relationService';

const UserFinder = () => {
  const [word, setWord] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');

  const searchByName = useCallback(
    debounce(async (name) => {
      const searchResult = await searchUsersApi(name);

      if (searchResult.success) {
        const users = searchResult.data;

        if (users.length > 0) {
          setSearchResults(users);
          setSearchMessage(`${users.length}명의 사용자가 검색되었습니다.`);
        } else {
          setSearchResults([]);
          setSearchMessage('일치하는 사용자가 없습니다.');
        }
      } else {
        setSearchMessage('이름 검색 중 오류가 발생했습니다.');
      }
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const name = e.target.value;
    setWord(name);

    if (name.length > 0) {
      searchByName(name);
    } else {
      setSearchResults([]);
      setSearchMessage('');
    }
  };

  return (
    <div>
      <h3>닉네임으로 사용자 찾기</h3>
      <form>
        <input
          value={word}
          onChange={handleSearchChange}
        />
      </form>
      <section>
          <p>{ searchMessage }</p>
          <ul>
            {searchResults.map((user, index) => (
              <UserFinderCard key={index} user={user} searchQuery={word} />
            ))}
          </ul>
        </section>
    </div>
  );
};

export default UserFinder;