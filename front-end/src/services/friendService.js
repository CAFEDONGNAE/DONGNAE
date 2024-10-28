import mockApi from "./mockApi";

export const searchUsersApi = async (name) => {
  try {
    const response = await mockApi.get('/members', {
      params: { name }
    });

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
    const response = await mockApi.post('/friends', {
      id
    });

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
    const response = await mockApi.get('/friends');

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
    const response = await mockApi.get('/friends/suggest');

    if (response.status === 200) {
      return { success: true, data: response.data, message: '추천 친구 목록 불러오기 성공' };
    }
  } catch (error) {
    console.error('친구 목록 불러오기 실패', error);
    return { success: false, message: '추천 친구 목록 불러오기 실패' };
  }
};