import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post('/member/logout');
    } catch (err) {
      console.err('Logout failed:', err);
    } finally {
      navigate('/');
    }
  };

  return <button onClick={handleLogout}>Logout</button>
};

export default LogoutButton;