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
  const [isProfile, setIsProfile] = useState(location.pathname === '/profile');

  useEffect(() => {
    setIsHide(location.pathname === '/login' || location.pathname === '/register');
    setIsProfile(location.pathname === '/profile');
  }, [location.pathname]);

  const goHome = () => {
    navigate('/');
  };

  return (
    <section
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
      }}
    >
      <h3 onClick={goHome} style={{cursor: 'pointer'}}>카페동네</h3>
      { isLoggedIn && (
          <div
            style={{
              display: 'flex',
              gap: '1rem'
            }}
          >
            <div>
              <h4>안녕하세요, { userName }</h4>
              { !isProfile && <Link to="/profile">내 정보보기</Link> }
            </div>
            <div>
              <Link to="/chatroom">채팅</Link>
            </div>
            <div>
              <LogoutButton />
            </div>
          </div>
        )
      }
      { !isHide && !isLoggedIn && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Link to="/login">로그인</Link>
          <Link to="/register">회원가입</Link>
        </div>
      )}
    </section>
  );
};

export default NavigationBar;