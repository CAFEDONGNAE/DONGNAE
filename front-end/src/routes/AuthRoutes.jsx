import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import PropTypes from "prop-types";

const AuthRoutes = ({ element }) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return element;
};

AuthRoutes.propTypes = {
  element: PropTypes.element.isRequired,
}

export default AuthRoutes;