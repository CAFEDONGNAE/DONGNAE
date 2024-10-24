import { useNavigate } from 'react-router-dom';
// import api from '../services/api';
import mockApi from '../services/mockApi';
import useAuthStore from '../store/authStore';

const LogoutButton = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      await mockApi.post('/member/logout');
    } catch (err) {
      console.err('Logout failed:', err);
    } finally {
      logout();
      navigate('/');
    }
  };

  return <button onClick={handleLogout}>Logout</button>
};

export default LogoutButton;