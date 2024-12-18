import AuthPage from "./pages/AuthPage.tsx";
import ProtectedUser from "./Components/ProtectedUser.tsx";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/user/HomePage.tsx";
import DashBoardPage from "./pages/admin/DashBoardPage.tsx";
import ProtectedAdmin from "./Components/ProtectedAdmin.tsx";
import AddUserPage from "./pages/admin/AddUserPage.tsx";
import ProfilePage from "./pages/admin/ProfilePage.tsx";
import UserLayout from "./layouts/UserLayout.tsx";
import AdminLayout from "./layouts/AdminLayout.tsx";
import EditUserDetailsPage from "./pages/admin/EditUserDetailsPage.tsx";

const App = () => {
  return (
    <Routes>
      {/*commonRoutes*/}
      <Route path="/" element={<AuthPage />} />
      {/*userRoutes*/}

      <Route element={<ProtectedUser />}>
        <Route path="/" element={<UserLayout />}>
          <Route path="/home" element={<HomePage />} />
        </Route>
      </Route>

      {/*adminRoutes*/}
      <Route element={<ProtectedAdmin />}>
        <Route path="/" element={<AdminLayout />}>
          <Route path="/dashboard" element={<DashBoardPage />} />
          <Route path="/adduser" element={<AddUserPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edituser/:id" element={<EditUserDetailsPage/>}/>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
