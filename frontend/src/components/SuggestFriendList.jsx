import SuggestFriendCard from "./SuggestFriendCard";
import { fetchSuggestFriends } from "../services/relationService";
import { useQuery } from "@tanstack/react-query";

const SuggestFriendList = () => {
  const { data: suggestFriendList = [], isLoading, error, refetch } = useQuery({
    queryKey: ['suggestFriendList'],
    queryFn: async () => {
      const result = await fetchSuggestFriends();
      if (result.success) {
        return result.data;
      } else {
        throw new Error('추천 친구 목록 불러오기 실패');
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <div>추천 친구 목록 불러오는 중...</div>;
  if (error) return <div>친구 목록 불러오기 실패</div>;

  return (
    <div>
      <h3>추천 친구 목록 <span>{suggestFriendList.length}</span></h3>
      <button onClick={() => refetch()}>새로고침</button>
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