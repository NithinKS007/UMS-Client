import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch, persistor } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { signout } from "../redux/auth.slice";
import { signoutUser } from "../redux/auth.thunk";

import {
  MdDashboard,
  MdPersonAdd,
  MdAccountCircle,
  MdLogout,
} from "react-icons/md";

interface NavItem {
  icon: JSX.Element;
  text: string;
  path: string;
}

const SideNavbar: React.FC = () => {
  const location = useLocation();

  const navItems: NavItem[] = [
    { icon: <MdDashboard />, text: "DASHBOARD", path: "/dashboard" },
    { icon: <MdPersonAdd />, text: "ADD USER", path: "/adduser" },
    { icon: <MdAccountCircle />, text: "PROFILE", path: "/profile" },
  ];

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(signoutUser());
    dispatch(signout());
    persistor.purge();
    navigate("/");
  };
  return (
    <nav className="fixed bg-white w-64 h-screen shadow-md flex flex-col justify-between z-10">
      <div className="px-2">
        <div className="p-4 border-b border-e-gray-700 flex justify-center items-center">
          <h1 className="text-3xl font-bold">UMS</h1>
        </div>
        <ul>
          {navItems.map((item, index) => (
            <Link key={index} to={item.path}>
              <li
                className={`px-4 py-3 flex items-center space-x-3 cursor-pointer mt-2 ${
                  location.pathname === item.path
                    ? "bg-blue-800 text-white rounded-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.text}</span>
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="px-2 mt-auto">
        <li className="px-4 py-3 flex border-y border-e-gray-700 items-center space-x-3 cursor-pointer mt-2 text-gray-600 hover:bg-gray-100">
          <span className="text-xl">
            <MdLogout />
          </span>
          <span onClick={handleLogout} className="font-medium">
            LOGOUT
          </span>
        </li>
      </div>
    </nav>
  );
};

export default SideNavbar;
