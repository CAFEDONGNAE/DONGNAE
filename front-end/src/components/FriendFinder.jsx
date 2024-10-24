import { useState } from 'react';
import { debounce } from 'lodash';
import mockApi from '../services/mockApi';
import FriendList from './FriendList';

const FriendFinder = () => {
  const [word, setWord] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchMessage, setSearchMessage] = useState('');

  const searchByName = debounce(async (name) => {
    try {
      const response = await mockApi.post('/member/friend', { name });

      if (response.status === 200) {
        const users = response.data.users;

        if (users.length > 0) {
          setSearchResults(users);
          setSearchMessage(`${users.length}명의 사용자가 검색되었습니다.`);
          console.log(users);
        } else {
          setSearchResults([]);
          setSearchMessage('일치하는 사용자가 없습니다.')
        }
      }
    } catch (error) {
      console.error('이름 검색 중 오류가 발생했습니다.', error);
      setSearchMessage('이름 검색 중 오류가 발생했습니다.');
    }
  })

  const handleSearchChange = (e) => {
    const name = e.target.value;
    setWord(name);

    if (name.length > 0) {
      searchByName(name);
    } else {
      setSearchResults([]);
      setSearchMessage('');
    }
  }

  return (
    <div>
      <h3>친구 찾기</h3>
      <form>
        <input
          value={word}
          onChange={handleSearchChange}
        />
        <section>
          <p>{ searchMessage }</p>
          <ul>
            {searchResults.map((user, index) => (
                <FriendList key={index} user={user} />
            ))}
          </ul>
        </section>
      </form>
    </div>
  );
};

export default FriendFinder;