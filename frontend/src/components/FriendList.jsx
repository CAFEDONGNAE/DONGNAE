import FriendCard from "./FriendCard";
import { useQuery } from '@tanstack/react-query';
import { fetchFriends } from "../services/relationService";

const FriendList = () => {
  // TanStack Query를 사용하여 친구 목록 데이터를 불러오고 캐싱
  const { data: friendList = [], isLoading, error } = useQuery({
    queryKey: ['friendList'], // 고유한 쿼리 키
    queryFn: async () => {
      const result = await fetchFriends();
      if (result.success) {
        return result.data;
      } else {
        throw new Error('친구 목록 불러오기 실패');
      }
    }, // 데이터 가져오는 함수
    staleTime: 1000 * 60 * 5, // 데이터가 5분 동안 신선하다고 간주
  });

  if (isLoading) return <div>친구 목록 불러오는 중...</div>;
  if (error) return <div>친구 목록 불러오기 실패</div>;

  return (
    <div>
      <h3>친구 목록 <span>{friendList.length}</span></h3>
      <ul>
        {friendList.map((friend, index) => (
          <li key={index}>
            <FriendCard friend={friend} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendList;