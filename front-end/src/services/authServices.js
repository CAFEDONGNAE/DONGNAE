// import api from './api';
import mockApi from './mockApi';
import useAuthStore from '../store/authStore';

export const loginApi = async (email, password) => {
  try {
    const response = await mockApi.post('/members/login', {
      email,
      password
    });

    if (response.status === 200) {
      const login = useAuthStore.getState().login;
      login(response.data.name, response.data.id);

      return { success: true, message: '로그인 성공' };
    }
  } catch (error) {
    console.error('로그인 실패', error);
    return { success: false, message: '로그인 실패' };
  }
};

export const registerApi = async (name, email, password) => {
  try {
    const response = await mockApi.post('/members/join', {
      name,
      email,
      password
    });

    if (response.status === 201) {
      return { success: true, message: '회원가입 성공' };
    }
  } catch (error) {
    console.error('회원가입 실패', error);
    return { success: false, message: '회원가입 실패' };
  }
};

export const logoutApi = async () => {
  try {
    const response = await mockApi.post('/members/logout');

    if (response.status === 200) {
      const logout = useAuthStore.getState().logout;
      logout();
      return { success: true, message: '로그아웃 성공' };
    }
  } catch (error) {
    console.error('로그아웃 실패', error);
    return { success: false, message: '로그아웃 실패' };
  }
};

export const checkEmailApi = async (email) => {
  try {
    const response = await mockApi.post('/members/check-email', { email });

    if (response.status === 200) {
      // 이메일 사용 가능
      return { success: true, message: '사용 가능한 이메일입니다.' };
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        // 이메일 중복
        return { success: false, message: '이미 사용 중인 이메일입니다.' };
      } else if (error.response.status === 400) {
        // 잘못된 요청 또는 통신 오류
        console.error('잘못된 요청 또는 통신 오류:', error);
        return { success: false, message: '잘못된 요청입니다. 이메일 형식을 확인하세요.' };
      } else {
        // 기타 서버 오류
        console.error('서버 오류:', error);
        return { success: false, message: '서버에서 오류가 발생했습니다.' };
      }
    } else {
      // 네트워크 오류 또는 응답없음
      console.error('네트워크 오류:', error);
      return { success: false, message: '네트워크 오류가 발생했습니다. 다시 시도해 주세요.' };
    }
  }
};