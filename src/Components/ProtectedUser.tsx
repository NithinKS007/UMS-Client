import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../redux/store";

const ProtectedUser: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return !user ? (
    <Navigate to="/" />
  ) : user.role !== "user" ? (
    <Navigate to="/" />
  ) : (
    <Outlet />
  );
};

export default ProtectedUser;
