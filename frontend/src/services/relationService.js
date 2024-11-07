// import mockApi from "./mockApi";
import api from "./api"

export const searchUsersApi = async (name) => {
  try {
    const response = await api.get('/members', {
      params: { name }
    });
    console.log('사용자 검색', response);

    if (response.status === 200) {
      return { success: true, data: response.data, message: '사용자 검색 성공' };
    }
  } catch (error) {
    console.error('사용자 검색 실패', error);
    return { success: false, message: '사용자 검색 중 오류가 발생'};
  };
};

export const addFriend = async (id) => {
  try {
    const response = await api.post('/relationships', {
      id
    });
    console.log('친구 추가', response);

    if (response.status === 200) {
      return { success: true, message: '친구 추가 성공'};
    }
  } catch (error) {
    console.error('사용자 검색 실패', error);
    return { success: false, message: '친구 추가 실패'};
  }
};

export const fetchFriends = async () => {
  try {
    const response = await api.get('/relationships');
    console.log('친구 리스트', response);

    if (response.status === 200) {
      return { success: true, data: response.data, message: '친구 목록 불러오기 성공' };
    }
  } catch (error) {
    console.error('친구 목록 불러오기 실패', error);
    return { success: false, message: '친구 목록 불러오기 실패' };
  }
};

export const fetchSuggestFriends = async () => {
  try {
    const response = await api.get('/relationships/suggest');
    console.log('추천 친구 리스트', response);

    if (response.status === 200) {
      return { success: true, data: response.data, message: '추천 친구 목록 불러오기 성공' };
    }
  } catch (error) {
    console.error('친구 목록 불러오기 실패', error);
    return { success: false, message: '추천 친구 목록 불러오기 실패' };
  }
};