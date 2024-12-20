import React, { useEffect, useState } from "react";
import ReuseTable from "../../Components/Table";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  deleteuser,
  fetchusers,
  updateUserBlockStatus,
} from "../../redux/admin/admin.thunk";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import ConfirmationModal from "../../Components/ConfirmationModal";
import PaginationRounded from "../../Components/Pagination";

interface UserData {
  _id: string;
  fname: string;
  lname: string;
  email: string;
  phone: string;
  dateOfBirth?: string | Date | null;
  isBlocked: boolean;
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
  const navigate = useNavigate();

  const fetchusersData = async () => {
    await dispatch(fetchusers());
  };

  useEffect(() => {
    fetchusersData();
  }, [dispatch]);

  const handleEdit = (userId: string) => {
    navigate(`/edituser/${userId}`);
  };

  const handleDelete = async () => {
    if (!userIdToDelete) return;
    try {
      const deletedUserData = await dispatch(
        deleteuser({ userId: userIdToDelete })
      );

      showSuccessToast(
        `${deletedUserData.payload.fname} ${deletedUserData.payload.lname} account has been deleted successfully`
      );
      setIsModalOpen(false);
    } catch (error) {
      console.log("Failed to delete user account, Please try again");
      showErrorToast("Failed to delete user account, Please try again");
      setIsModalOpen(false);
    }
  };

  const handlePageChange = () =>{


    
  }

  const toggleuserBlockStatus = async (
    userId: string,
    blockStatus: boolean
  ) => {
    try {
      const userData = await dispatch(
        updateUserBlockStatus({ userId, blockStatus })
      );

      showSuccessToast(
        `${
          userData?.payload.isBlocked
            ? `${userData?.payload.fname} no longer has access`
            : `${userData?.payload.fname} has access`
        }`
      );
    } catch (error) {
      showErrorToast(
        "Failed to toggle block status user account, Please try again"
      );
    }
  };

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [userIdToDelete, setUserIdToDelete] = useState<string | null>(null);

  const handleModalOpen = (userId: string) => {
    setUserIdToDelete(userId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setUserIdToDelete(null);
  };

  const usersData: UserData[] = getuserData
    ? getuserData.map((user) => ({
        _id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toDateString()
          : "Not Available",
        isBlocked: user.isBlocked,
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
              onClick={() => handleModalOpen(user._id)}
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
    { label: "First Name", field: "fname" },
    { label: "Last Name", field: "lname" },
    { label: "Email", field: "email" },
    { label: "Phone", field: "phone" },
    { label: "DOB", field: "dateOfBirth" },
    { label: "Status", field: "isBlocked" },
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
    <>
      <ReuseTable
        columns={columns}
        data={usersData}
        sort={sort}
        filter={filter}
        direction={direction}
        toggleuserBlockStatus={toggleuserBlockStatus}
      />
      <div style={{ display: "flex", justifyContent: "flex-end",marginTop:"10px" }}>
        <PaginationRounded page={10} onChange={handlePageChange} count={10} />
      </div>

      <ConfirmationModal
        open={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleDelete}
        title="Confirm deletion"
        message="Are you sure you want to delete this user? This action cannot be undone"
      />
    </>
  );
};

export default DashBoardPage;
