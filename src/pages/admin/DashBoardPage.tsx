import React, { useEffect } from "react";
import SideNavbar from "../../Components/SideNavbar";
import TopNavbar from "../../Components/TopNavbar";
import ReuseableTable from "../../Components/ReuseableTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { fetchusers } from "../../redux/admin.thunk";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob?: string | Date | null;
  status: string;
  actions: React.ReactNode;
}

interface SortOption {
  value: string;
}

interface FilterOption {
  value: string;
}

interface DirectionOption {
  value: string;
}

const DashBoardPage: React.FC = () => {
  const getuserData = useSelector((state: RootState) => state.admin.users);
  const dispatch = useDispatch<AppDispatch>();

  const fetchusersData = async () => {
    await dispatch(fetchusers());
  };

  useEffect(() => {
    fetchusersData();
  }, [dispatch]);

  const handleEdit = (userId: string) => {
    console.log(`Edit user with ID: ${userId}`);
  };

  const handleDelete = (userId: string) => {
    console.log(`Delete user with ID: ${userId}`);
  };

  const usersData: UserData[] = getuserData
    ? getuserData.map((user) => ({
        _id: user._id,
        firstName: user.fname,
        lastName: user.lname,
        email: user.email,
        phone: user.phone,
        dob: user.dateOfBirth ? user.dateOfBirth : "Not Available",
        status: user.isBlocked ? "Blocked" : "Not Blocked",
        actions: (
          <div>
            <IconButton
              onClick={() => handleEdit(user._id)}
              size="small"
              sx={{ fontSize: "16px" }}
            >
              <EditIcon sx={{ fontSize: "inherit" }} />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(user._id)}
              size="small"
              sx={{ fontSize: "16px" }}
            >
              <DeleteIcon sx={{ fontSize: "inherit" }} />
            </IconButton>
          </div>
        ),
      }))
    : [];

  const columns = [
    { label: "First Name", field: "firstName" },
    { label: "Last Name", field: "lastName" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    { label: "DOB", field: "dob" },
    { label: "Status", field: "status" },
    { label: "Actions", field: "actions" },
  ];

  const sort: SortOption[] = [
    { value: "First Name" },
    { value: "Last Name" },
    { value: "Email" },
  ];
  const filter: FilterOption[] = [
    { value: "All" },
    { value: "Block" },
    { value: "Unblock" },
  ];
  const direction: DirectionOption[] = [
    { value: "A to Z" },
    { value: "Z to A" },
  ];
  return (
    <div className="flex flex-col min-h-screen">
      <TopNavbar />
      <div className="flex flex-1">
        <div className="w-64 bg-gray-800 text-white">
          <SideNavbar />
        </div>
        <div className="flex-1 p-4 pt-24">
          <ReuseableTable
            columns={columns}
            data={usersData}
            sort={sort}
            filter={filter}
            direction={direction}
          />
        </div>
      </div>
    </div>
  );
};

export default DashBoardPage;
