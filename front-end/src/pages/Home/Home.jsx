import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import LogoutButton from '../../components/LogoutButton';
import UserFinder from '../../components/UserFinder';

const Home = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userName = useAuthStore((state) => state.userName);
  const userId = useAuthStore((state) => state.userId);

  return (
    <>
      <div>
        <h1>카페동네</h1>
        <p>서울 관악구 남부순환로 1600-1</p>
      </div>
      {
        isLoggedIn ? (
          <>
            <h3>안녕하세요, { userName }</h3>
            <Link to={`/user/${userId}`}>내 정보보기</Link>
            <LogoutButton />
            <UserFinder />
          </>
        ) : (
          <>
            <Link to="/login">로그인</Link>
            <Link to="/register">회원가입</Link>
          </>
        )
      }
    </>
  );
};

export default Home;