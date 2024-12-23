import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';

const PrivateRoute = (props) => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const account = useSelector(state => state.user.account);

  if (isAuthenticated && account.role !== 'ADMIN') {
    toast.error('You are not an administrator');
  }

  return isAuthenticated && account.role === 'ADMIN'
    ? props.children
    : <Navigate to="/login" state={{ requiredRole: 'ADMIN' }} replace />;
}

export default PrivateRoute;
