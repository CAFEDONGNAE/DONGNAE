import useAuthStore from "../../store/authStore";
// import { useParams  } from 'react-router-dom';
import FriendList from "../../components/FriendList";
import SuggestFriendList from "../../components/SuggestFriendList";

const Profile = () => {
  // const { id } = useParams();
  const userName = useAuthStore((state) => state.userName);

  return (
    <div>
      <p>{ userName ? userName : '로그인되어있지않음' }</p>
      <FriendList />
      <SuggestFriendList />
    </div>
  );
}

export default Profile;