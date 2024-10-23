import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div>
        <h1>서비스의 이름이 들어가는 부분</h1>
        <p>서비스에 대한 설명이 작성된 부분. 어쩌고 저쩌고 뭐라 써 있음</p>
      </div>
      <div>
        <Link to="/login">로그인</Link>
        <Link to="/register">회원가입</Link>
      </div>
    </>
  );
};

export default Home;