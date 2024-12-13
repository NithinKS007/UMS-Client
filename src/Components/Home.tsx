import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, persistor, RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { signout } from "../redux/auth.slice";
import { signoutUser } from "../redux/auth.thunk";

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(signoutUser());
    dispatch(signout());
    persistor.purge();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      {user ? (
        <div className="max-w-lg w-full bg-white shadow-md rounded-xl p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome, {user.fname} {user.lname}
          </h1>
          <p className="text-sm text-gray-500 mb-2">Email: {user.email}</p>
          <p className="text-sm text-gray-500 mb-2">Phone: {user.phone}</p>
          <p className="text-sm text-gray-500 mb-4">Status: {user.isBlocked ? "Blocked" : "Active"}</p>

          {user.dateOfBirth && (
            <p className="text-sm text-gray-500 mb-2">Date of Birth: {new Date(user.dateOfBirth).toLocaleDateString()}</p>
          )}

          {user.address && <p className="text-sm text-gray-500 mb-2">Address: {user.address}</p>}

          {user.createdAt && (
            <p className="text-sm text-gray-500 mb-2">
              Account Created: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          )}

          {user.updatedAt && (
            <p className="text-sm text-gray-500 mb-4">
              Last Updated: {new Date(user.updatedAt).toLocaleDateString()}
            </p>
          )}

          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-500">Please log in to view your profile.</div>
      )}
    </div>
  );
};

export default Home;
