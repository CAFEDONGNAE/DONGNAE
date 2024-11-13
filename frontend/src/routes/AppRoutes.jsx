import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Profile from '../pages/Profile/Profile';
import AuthRoutes from './AuthRoutes';
import ChatRoom from '../pages/Chat/ChatRoom';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />
      <Route path="/chatroom/:roomName" element={<ChatRoom />} />

      <Route path="/profile" element={<AuthRoutes element={<Profile />} />} />
    </Routes>
  );
};

export default AppRoutes;