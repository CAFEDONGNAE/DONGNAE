import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import LogoutButton from './LogoutButton';

const NavigationBar = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userName = useAuthStore((state) => state.userName);
  const navigate = useNavigate();
  const location = useLocation();
  const [isHide, setIsHide] = useState(location.pathname === '/login' || location.pathname === '/register');

  useEffect(() => {
    setIsHide(location.pathname === '/login' || location.pathname === '/register');
  }, [location.pathname]);

  const goHome = () => {
    navigate('/');
  };

  return (
    <section>
      <h3 onClick={goHome} style={{cursor: 'pointer'}}>카페동네</h3>
      { isLoggedIn && (
          <>
            <h4>안녕하세요, { userName }</h4>
            <Link to="/profile">내 정보보기</Link>
            <LogoutButton />
          </>
        )
      }
      { !isHide && !isLoggedIn && (
        <>
          <Link to="/login">로그인</Link>
          <Link to="/register">회원가입</Link>
        </>
      )}
    </section>
  );
};

export default NavigationBar;