// import { Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import UserFinder from '../../components/UserFinder';

const Home = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <>
      <div>
        <p>서울 관악구 남부순환로 1600-1</p>
      </div>
      { isLoggedIn && <UserFinder /> }
    </>
  );
};

export default Home;