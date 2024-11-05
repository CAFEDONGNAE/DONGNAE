import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../../services/authService';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginResult = await loginApi(email, password);

    if (loginResult.success) {
      navigate('/');
    } else {
      alert('아이디 또는 비밀번호가 일치하지 않습니다');
    }
  };

  const goRegister = () => {
    navigate('/register');
  }

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
      <button onClick={goRegister}>회원가입</button>
    </div>
  );
};

export default Login;