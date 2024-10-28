import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { registerApi, loginApi, checkEmailApi } from '../../services/authService';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    email: true,
    password: true
  });
  const [emailCheckMessage, setEmailCheckMessage] = useState('');
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // debounce 적용된 이메일 체크 함수
  const debouncedCheckEmail = debounce(async (email) => {
    const result = await checkEmailApi(email);

    if (result.success) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: false
      }));
      setEmailCheckMessage(result.message);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: true
      }));
      setEmailCheckMessage(result.message);
    }
  }, 300); // 300ms 대기

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (emailRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: false
      }));
      // 이메일 형식이 맞으면 중복 검사 실행
      debouncedCheckEmail(value);
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: true
      }));
      setEmailCheckMessage('이메일 형식이 올바르지 않습니다.');
    }
  };

  const passwordCriteria = [
    /[a-z]/,
    /[A-Z]/,
    /[0-9]/,
    /[!@#$%^&*(),.?":{}|<>]/
  ];

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const validCriteriaCount = passwordCriteria.filter((regex) => regex.test(value)).length;

    if (value.length >= 8 && value.length <= 15 && validCriteriaCount >= 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: false
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: true
      }));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (errors.email || errors.password) return;

    const registerResult = await registerApi(name, email, password);

    if (registerResult.success) {
      console.log('회원가입 성공');
      const loginResult = await loginApi(email, password);

      if (loginResult.success) {
        navigate('/');
      } else {
        alert('자동 로그인 실패. 로그인 페이지로 이동합니다.');
        navigate('/login');
      }
    } else {
      alert('회원가입 실패');
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={handleRegister}>
        <div>
          <label>닉네임 : </label>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>이메일 : </label>
          <input 
            type="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          {email.length > 0 && <p>{emailCheckMessage}</p>}
        </div>
        <div>
          <label>비밀번호 : </label>
          <input 
            type="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <p>비밀번호 8자 이상 15자 이하, 영어 소문자, 대문자, 숫자, 특수문자 중 3개 이상 포함</p>
          {errors.password && password.length > 0 && <p>비밀번호 형식이 잘못되었습니다</p>}
        </div>
        <button type="submit" disabled={errors.email || errors.password}>회원가입</button>
      </form>
    </div>
  );
};

export default Register;
