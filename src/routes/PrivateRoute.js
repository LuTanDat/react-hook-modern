import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const PrivateRoute = ({ children, requiredRole }) => {

  const { isAuthenticated, account } = useSelector(state => state.user);

  // Nếu chưa đăng nhập, chuyển hướng đến trang login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Nếu yêu cầu role và người dùng không có role phù hợp, chuyển hướng về home
  if (requiredRole && account.role !== requiredRole) {
    toast.warning("Bạn vui lòng Đăng xuất sau đó Đăng nhập lại với Tài khoản ADMIN để tiếp tục!");
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;