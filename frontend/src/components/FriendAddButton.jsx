import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFriend } from "../services/relationService";

const FriendAddButton = ({ id }) => {
  const queryClient = useQueryClient();

  // useMutation을 사용하여 비동기 작업 관리
  const mutation = useMutation({
    mutationFn: () => addFriend(id),
    onSuccess: () => {
      // 친구 추가가 성공했을 때, 쿼리 무효화
      queryClient.invalidateQueries(['suggestFriendList']);
      queryClient.invalidateQueries(['friendList']);
    },
    onError: () => {
      alert('친구 추가 실패');
    },
  });

  return (
    <button onClick={() => mutation.mutate()} disabled={mutation.isLoading || mutation.isSuccess}>
      {mutation.isSuccess ? '요청보냄' : '친구 추가'}
    </button>
  );
};

FriendAddButton.propTypes = {
  id: PropTypes.number.isRequired,
};

export default FriendAddButton;