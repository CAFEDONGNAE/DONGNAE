// import useAuthStore from "../../store/authStore";
// import { useParams  } from 'react-router-dom';
import FriendList from "../../components/FriendList";
import SuggestFriendList from "../../components/SuggestFriendList";
import MyProfileCard from "../../components/MyProfileCard";

const Profile = () => {

  return (
    <div>
      <MyProfileCard />
      <FriendList />
      <SuggestFriendList />
    </div>
  );
}

export default Profile;