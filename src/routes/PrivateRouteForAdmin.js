import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from 'react-toastify';

const PrivateRoute = (props) => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const account = useSelector(state => state.user.account);

  if (isAuthenticated && account.role !== 'ADMIN') {
    toast.error('You are not an administrator');
    setTimeout(() => {
      toast.error('Please log in again with administrator rights to continue.')
    }, 600)
  }

  return isAuthenticated && account.role === 'ADMIN' ? props.children : <Navigate to="/login" />
}

export default PrivateRoute;