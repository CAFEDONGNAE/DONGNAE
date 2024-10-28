import { useNavigate } from 'react-router-dom';
import { logoutApi } from '../services/authServices';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logoutResult = await logoutApi();

    if (logoutResult.success) {
      navigate('/');
    } else {
      alert('로그아웃 실패');
    }
  };

  return <button onClick={handleLogout}>Logout</button>
};

export default LogoutButton;