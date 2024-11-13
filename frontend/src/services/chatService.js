import api from './api';

export const createChatRoom = async (memberIds, roomName) => {
  try {
    const response = await api.post('/chatroom/create', {
      memberIds,
      roomName
    });

    console.log(response);

    if (response.status === 201) {
      return { success: true, message: '채팅방 생성 성공', data: response.data };
    }
  } catch (error) {
    console.error('채팅방 생성 실패', error);
    return { success: false, message: '채팅방 생성 실패' };
  }
};

export const fetchChatRooms = async () => {
  try {
    const response = await api.get('/chatroom');

    console.log(response);

    if (response.status === 200) {
      return { success: true, message: '채팅방 조회 성공', data: response.data };
    }
  } catch (error) {
    console.error('채팅방 조회 실패', error);
    return { success: false, message: '채팅방 조회 실패' };
  }
};