import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = (props) => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);

  return isAuthenticated ? props.children : <Navigate to="/login" />
}

export default PrivateRoute;