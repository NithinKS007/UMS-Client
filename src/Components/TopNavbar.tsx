import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { searchusers } from "../redux/admin.thunk";
import { setSearch } from "../redux/admin.slice";

const TopNavbar: React.FC = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const { sort, filter, direction } = useSelector((state: RootState) => state.admin);

  const [search, setSearchInput] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {

      dispatch(setSearch(search));
      dispatch(searchusers({ search, sort, filter, direction }));
    
  };
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm px-6 py-3 z-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-52 w-2/3">
          <div className="h-10 w-40"></div>
          <div className="flex w-full space-x-1">
            <input
              type="text"
              className="px-4 py-2 w-80 border-2 rounded "
              placeholder="Search...."
              onChange={(event)=>setSearchInput(event.target.value)}
            />
            <button
              onClick={handleSearch}
              className="bg-blue-800 text-gray-50 text-2xl px-3 py-2 rounded-md"
            >
              <IoSearchOutline />
            </button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <FaUser className="text-white" />
          </div>
          <span className="text-lg">{`${userData?.fname} ${userData?.lname}`}</span>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
