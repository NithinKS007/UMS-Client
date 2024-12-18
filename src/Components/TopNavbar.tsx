import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { searchusers } from "../redux/admin/admin.thunk";
import { setSearch } from "../redux/admin/admin.slice";
import SearchBar from "./SearchBar";

const TopNavbar: React.FC = () => {
  const userData = useSelector((state: RootState) => state.auth.user);

  const { sort, filter, direction } = useSelector(
    (state: RootState) => state.admin
  );

  const [search, setSearchInput] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    dispatch(setSearch(search));
    dispatch(searchusers({ search, sort, filter, direction }));
  };
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-sm px-6 py-3 z-10">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center  space-x-52 w-2/3">
          <div className="mr-10"></div>
          {userData?.role==="admin"? <SearchBar
            handleSearch={handleSearch}
            search={search}
            setSearchInput={setSearchInput}
          />:"" }
          
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
