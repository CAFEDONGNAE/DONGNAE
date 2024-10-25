import { http, HttpResponse } from 'msw';

let currentSession = null;

// 예시 Mock 데이터
let mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123!' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password456!' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', password: 'password789!' },
  { id: 4, name: 'James Lewis', email: 'james.lewis11@example.com', password: '85UJXGGb^t' },
  { id: 5, name: 'James Walker', email: 'james.walker41@example.com', password: 'l%*8Lpg6Qy' },
  { id: 6, name: 'Sophia Brown', email: 'sophia.brown15@example.com', password: 'vqFa!vmvco' },
  { id: 7, name: 'Sophia Harris', email: 'sophia.harris71@example.com', password: '0h$AImBo9P' },
  { id: 8, name: 'David Walker', email: 'david.walker17@example.com', password: 'G$bo^sETRc' },
  { id: 9, name: 'Sophia Lewis', email: 'sophia.lewis5@example.com', password: '98xbj*cqLj' },
  { id: 10, name: 'Daniel Walker', email: 'daniel.walker73@example.com', password: 'sFqRT*d&2h' },
  { id: 11, name: 'Emma Anderson', email: 'emma.anderson61@example.com', password: '4qWn6#U1Qx' },
  { id: 12, name: 'Michael Thompson', email: 'michael.thompson70@example.com', password: 'Q^@m$R@yCa' },
  { id: 13, name: 'James Walker', email: 'james.walker6@example.com', password: 'v2*tJL1Anw' },
  { id: 14, name: 'Sophia Harris', email: 'sophia.harris37@example.com', password: 'nlgh2jez10' },
  { id: 15, name: 'Olivia Wilson', email: 'olivia.wilson94@example.com', password: '%8cjdOIdkA' },
  { id: 16, name: 'Emily Clark', email: 'emily.clark66@example.com', password: 'j88$mvW0nA' },
  { id: 17, name: 'James Thompson', email: 'james.thompson12@example.com', password: 'W3QvjxnO9S' },
  { id: 18, name: 'Michael Robinson', email: 'michael.robinson17@example.com', password: '^TE7FTa39M' },
  { id: 19, name: 'David Robinson', email: 'david.robinson75@example.com', password: 'Mk2*1a^ib6' },
  { id: 20, name: 'Daniel Brown', email: 'daniel.brown53@example.com', password: '1yQ$4c#UIC' },
  { id: 21, name: 'Daniel Harris', email: 'daniel.harris11@example.com', password: '*95$ax#Z@%' },
  { id: 22, name: 'Olivia Anderson', email: 'olivia.anderson30@example.com', password: 'h*Xwjxd$%B' },
  { id: 23, name: 'Michael Harris', email: 'michael.harris93@example.com', password: 'h6m9e1hreT' },
  { id: 24, name: 'node', email: 'node@node.no', password: 'nodenode1!' },
];

// 친구
let mockFriends = [
  { id: 9, name: 'Sophia Lewis', email: 'sophia.lewis5@example.com', password: '98xbj*cqLj' },
  { id: 16, name: 'Emily Clark', email: 'emily.clark66@example.com', password: 'j88$mvW0nA' },
  { id: 21, name: 'Daniel Harris', email: 'daniel.harris11@example.com', password: '*95$ax#Z@%' },
]

// 추천 친구
let mockSuggestFriends = [
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password456!' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', password: 'password789!' },
]

// ID 생성기 (회원가입 시 새로운 사용자에 대해 고유 ID 생성)
const generateUserId = () => {
  return mockUsers.length > 0 ? Math.max(...mockUsers.map(u => u.id)) + 1 : 1;
};

export const handlers = [
  // 회원가입 API Mock
  http.post('http://localhost:5001/members/join', async ({ request }) => {
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
  http.post('http://localhost:5001/members/check-email', async ({ request }) => {
    const { email } = await request.json();

    const existingUser = mockUsers.find((user) => user.email === email);
    if (existingUser) {
      return HttpResponse.json(
        { message: '이미 사용중인 이메일입니다' },
        { status: 409 }
      );
    }

    return HttpResponse.json(
      { status: 200 }
    );
  }),

  // 로그인 API Mock
  http.post('http://localhost:5001/members/login', async ({ request }) => {
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
  http.post('http://localhost:5001/members/logout', () => {
    // 세션 초기화
    currentSession = null;

    return HttpResponse.json(
      { message: '로그아웃 성공' },
      { status: 200 }
    );
  }),

  // 회원 검색
  http.get('http://localhost:5001/members', async ({ request }) => {
    // request.url에서 쿼리 매개변수 가져오기
    const name = new URL(request.url).searchParams.get('name');
  
    // 이름이 존재할 때만 검색
    if (name) {
      const matchingUsers = mockUsers.filter(user => 
        user.name.toLowerCase().includes(name.toLowerCase())
      );
  
      if (matchingUsers.length > 0) {
        const userList = matchingUsers.map(user => ({
          name: user.name,
          email: user.email,
          id: user.id
        }));
  
        return HttpResponse.json(
          { users: userList },
          { status: 200 }
        );
      }
    }
  
    // 일치하는 사용자가 없을 경우 빈 리스트 반환
    return HttpResponse.json(
      { users: [] },
      { status: 200 }
    );
  }),

  // 친구 추가
  http.post('http://localhost:5001/friends', async ({ request }) => {
    const { id } = await request.json();
    const user = mockUsers.find((u) => u.id === id);

    if (!user) {
      // 사용자 ID가 존재하지 않으면 에러 반환
      return HttpResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    // 이미 친구인 경우
    const isAlreadyFriend = mockFriends.some((friend) => friend.id === id);
    if (isAlreadyFriend) {
      return HttpResponse.json(
        { error: '이미 친구입니다.' },
        { status: 400 }
      );
    }

    // 친구 요청 목록에 추가
    mockFriends.push(user);

    // 성공적으로 친구 요청을 보냈음을 반환
    return HttpResponse.json(
      { message: '친구 요청이 성공적으로 전송되었습니다.', user },
      { status: 200 }
    );
  }),

  // 친구 목록 불러오기
  http.get('http://localhost:5001/friends', async () => {
    return HttpResponse.json(
      { member: mockFriends },
      { status: 200 }
    );
  }),

  // 추천/친구 목록 불러오기
  http.get('http://localhost:5001/friends/suggest', async () => {
    return HttpResponse.json(
      { member: mockSuggestFriends },
      { status: 200 }
    );
  }),

  // 추천/친구 목록 불러오기
  http.get('http://localhost:5001/members/profile', async () => {
    const profile = {
      name: 'node',
      email: 'node@node.no'
    }
    return HttpResponse.json(
      { member: profile },
      { status: 200 }
    );
  }),
];
