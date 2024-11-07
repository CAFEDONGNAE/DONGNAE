import api from './api';

export const createChatRoom = async (memberId, roomName) => {
  try {
    const response = await api.post('/chatrooms', {
      memberId,
      roomName
    });

    console.log(response);

    if (response.status === 200) {
      return { success: true, message: '채팅방 생성 성공' };
    }
  } catch (error) {
    console.error('채팅방 생성 실패', error);
    return { success: false, message: '채팅방 생성 실패' };
  }
};