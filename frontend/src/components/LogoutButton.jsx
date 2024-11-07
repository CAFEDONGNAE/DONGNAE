import { useNavigate } from 'react-router-dom';
import { logoutApi } from '../services/authService';
import { useQueryClient } from '@tanstack/react-query';

const LogoutButton = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    const logoutResult = await logoutApi();

    if (logoutResult.success) {
      queryClient.clear();
      navigate('/');
    } else {
      alert('로그아웃 실패');
    }
  };

  return <button onClick={handleLogout}>Logout</button>
};

export default LogoutButton;