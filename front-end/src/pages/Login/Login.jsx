import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import useAuthStore from '../../store/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/member/login', {
        email,
        password,
      });
      if (response.status === 200) {
        login(response.data.name, response.data.id);
        navigate('/');
      }
    } catch (error) {
      if (error.response) {
        console.error('Login failed', error.response.status, error.response.data);
      } else {
        console.error('login failed', error.message);
      }
      alert('login failed');
    }
  };

  return(
    <div>
      <h1>로그인</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>이메일 : </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>비밀번호 : </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default Login;