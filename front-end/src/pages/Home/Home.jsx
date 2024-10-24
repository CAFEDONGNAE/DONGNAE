import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import LogoutButton from '../../components/LogoutButton';

const Home = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userName = useAuthStore((state) => state.userName);

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
            <LogoutButton />
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