import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/action/userAction";

const ListQuiz = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { listUsers, isLoading, error } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [error, navigate]);

  return (
    <div className="list-quiz-container container">
      {isLoading && <p>Loading users...</p>}
      {!isLoading && listUsers?.length === 0 && <p>No users found.</p>}
      {!isLoading && listUsers?.length > 0 && (
        <ul>
          {listUsers?.map((user, index) => (
            <li key={index}>{user.username} - {user.email}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ListQuiz;