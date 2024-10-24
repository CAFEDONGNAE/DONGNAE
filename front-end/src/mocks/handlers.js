import { http, HttpResponse } from 'msw';

let currentSession = null;

// 예시 Mock 데이터
let mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123!' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password456!' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', password: 'password789!' }
];

// ID 생성기 (회원가입 시 새로운 사용자에 대해 고유 ID 생성)
const generateUserId = () => {
  return mockUsers.length > 0 ? Math.max(...mockUsers.map(u => u.id)) + 1 : 1;
};

export const handlers = [
  // 회원가입 API Mock
  http.post('http://localhost:5001/member/join', async ({ request }) => {
    const { name, email, password } = await request.json();

    // 이메일 중복 체크
    const existingUser = mockUsers.find((user) => user.email === email);
    if (existingUser) {
      return HttpResponse.json(
        { error: '이미 사용 중인 이메일입니다.' },
        { status: 400 }
      );
    }

    // 새로운 사용자 추가
    const newUser = { id: generateUserId(), name, email, password };
    mockUsers.push(newUser);

    return HttpResponse.json(
      { message: '회원가입 성공', user: newUser },
      { status: 201 }
    );
  }),

  // 이메일 중복 체크 API Mock
  http.post('http://localhost:5001/member/join/email', async ({ request }) => {
    const { email } = await request.json();

    const existingUser = mockUsers.find((user) => user.email === email);
    if (existingUser) {
      return HttpResponse.json(
        { exist: true, message: '이미 사용중인 이메일입니다' },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { exist: false },
      { status: 200 }
    );
  }),

  // 로그인 API Mock
  http.post('http://localhost:5001/member/login', async ({ request }) => {
    const { email, password } = await request.json();

    // 이메일과 비밀번호 확인
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (!user) {
      return HttpResponse.json(
        { error: '이메일 또는 비밀번호가 잘못되었습니다.' },
        { status: 401 }
      );
    }

    // 세션에 사용자 정보 저장 (간단한 토큰 생성 예시)
    currentSession = { userId: user.id, token: `mock-token-${user.id}` };

    return HttpResponse.json(
      { message: '로그인 성공', token: currentSession.token, id: user.id, name: user.name },
      { status: 200 }
    );
  }),

  // 로그아웃 API Mock
  http.post('http://localhost:5001/member/logout', () => {
    // 세션 초기화
    currentSession = null;

    return HttpResponse.json(
      { message: '로그아웃 성공' },
      { status: 200 }
    );
  })
];
