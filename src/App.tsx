import AuthPage from "./pages/AuthPage.tsx";
import ProtectedUser from "./Components/ProtectedUser.tsx";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home.tsx";
import DashBoardPage from "./pages/admin/DashBoardPage.tsx";
import ProtectedAdmin from "./Components/ProtectedAdmin.tsx";
import AddUserPage from "./pages/admin/AddUserPage.tsx";
import ProfilePage from "./pages/admin/ProfilePage.tsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AuthPage />} />

      <Route element={<ProtectedUser />}>
        <Route path="/home" element={<Home />} />
      </Route>

      <Route element={<ProtectedAdmin />}>
        <Route path="/dashboard" element={<DashBoardPage />} />
        <Route path="/adduser" element={<AddUserPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Routes>
  );
};

export default App;
