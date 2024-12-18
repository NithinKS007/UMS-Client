import TopNavbar from "../Components/TopNavbar";
import SideNavbar from "../Components/SideNavbar";
import { MdAccountCircle } from "react-icons/md";
import { Outlet } from "react-router-dom";

const UserLayout: React.FC = () => {
  const userNavItems = [
    { icon: <MdAccountCircle />, text: "HOME ", path: "/home" },
  ];
  return (
    <div className="flex flex-col min-h-screen">
    <TopNavbar />
    <div className="flex flex-1">
      <div className="w-64">
        <SideNavbar navItems={userNavItems} />
      </div>
      <div className="flex-1 p-4 pt-24 overflow-auto">
        <Outlet />
      </div>
    </div>
  </div>
  );
};

export default UserLayout;
