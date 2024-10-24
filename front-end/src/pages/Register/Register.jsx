import { useState } from 'react';
// import api from '../../services/api';
import mockApi from '../../services/mockApi';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

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

  const checkEmailExists = debounce(async (email) => {
    try {
      const response = await mockApi.post('/member/join/email', { email });
      if (response.data.exist) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: true
        }));
        setEmailCheckMessage('이미 사용 중인 이메일입니다.');
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: false
        }));
        setEmailCheckMessage('사용 가능한 이메일입니다.');
      }
    } catch (error) {
      console.error('이메일 중복 확인 오류', error);
      setEmailCheckMessage('이메일 확인 중 오류가 발생했습니다.');
    }
  }, 300); // 500ms 대기

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (emailRegex.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: false
      }));
      // 이메일 형식이 맞으면 중복 검사 실행
      checkEmailExists(value);
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

    try {
      const response = await mockApi.post('/member/join', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        console.log('회원가입 성공', response);
        navigate('/login');
      }
    } catch (error) {
      console.error('회원가입 실패', error);
      alert('회원가입에 실패했습니다.');
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
