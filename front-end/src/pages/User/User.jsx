import useAuthStore from "../../store/authStore";
// import { useParams  } from 'react-router-dom';

const User = () => {
  // const { id } = useParams();
  const userName = useAuthStore((state) => state.userName);

  return (
    <div>
      <p>{ userName ? userName : '로그인되어있지않음' }</p>
    </div>
  );
}

export default User;