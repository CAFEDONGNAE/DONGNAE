import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import User from '../pages/User/User';
import AuthRoutes from './AuthRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Home />} />

      <Route path="/user/:id" element={<AuthRoutes element={<User />} />} />
    </Routes>
  );
};

export default AppRoutes;