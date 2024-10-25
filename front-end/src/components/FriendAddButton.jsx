import PropTypes from "prop-types";
import { useState } from "react";
import mockApi from "../services/mockApi";

const FriendAddButton = ({ id }) => {
  const [isRequest, setIsRequest] = useState(false)

  const handleFriendRequest = async () => {
    try {
      const response = await mockApi.post('/friends', {
        id
      });

      if (response.status === 200) {
        console.log('친구요청 보내기 성공', response);
        setIsRequest(true);
      }
    } catch (error) {
      console.log('친구요청 실패', error); 
    }
  }

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