import React from "react";
import SideNavbar from "../Components/SideNavbar";
import TopNavbar from "../Components/TopNavbar";
import { Outlet } from "react-router-dom";
import { MdDashboard, MdPersonAdd, MdAccountCircle } from "react-icons/md";

const AdminLayout: React.FC = () => {
  const adminNavItems = [
    { icon: <MdDashboard />, text: "DASHBOARD", path: "/dashboard" },
    { icon: <MdPersonAdd />, text: "ADD USER", path: "/adduser" },
    { icon: <MdAccountCircle />, text: "PROFILE", path: "/profile" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      <div className="flex flex-1">
        <div className="w-64">
          <SideNavbar navItems={adminNavItems} />
        </div>
        <div className="flex-1 p-4 pt-24 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
