import PropTypes from "prop-types";
import { useState } from "react";
import { addFriend } from "../services/friendService";

const FriendAddButton = ({ id }) => {
  const [isRequest, setIsRequest] = useState(false)

  const handleFriendRequest = async () => {
    const addFriendResult = await addFriend(id);

    if (addFriendResult.success) {
      setIsRequest(true);
    } else {
      alert('친구 추가 실패');
    }
  };

  return (
    <button onClick={handleFriendRequest} disabled={isRequest}>
      {isRequest ? '요청보냄' : '친구 추가'}
    </button>
  );
};

FriendAddButton.propTypes = {
  id: PropTypes.number.isRequired
}

export default FriendAddButton;