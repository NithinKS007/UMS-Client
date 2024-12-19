import React, { useEffect } from "react";
import Profile from "../../Components/Profile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getuserDetails,
  updateuserDetails,
} from "../../redux/admin/admin.thunk";
import { useParams } from "react-router-dom";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { User } from "../../redux/auth/auth.types";
import { validateProfileForm } from "../../utils/validateForms";


const EditUserDetailsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { userDetails } = useSelector((state: RootState) => state.admin);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) {
      dispatch(getuserDetails(id));
    }
  }, [dispatch, id]);

  const handleUpdateuserDetails = async (userData: any) => {
    if (id) {
      try {
        
        const updatedUserData = await dispatch(
          updateuserDetails({ id, userData })
        );

        showSuccessToast(
          `The details of ${updatedUserData.payload.fname} ${updatedUserData.payload.lname} have been successfully updated.`
        );
      } catch (error) {
        console.log("Failed to update user details, Please try again");

        showErrorToast("Failed to update user details, Please try again");
      }
    }
  };



  return <Profile profileData ={userDetails as User} onSave={handleUpdateuserDetails} validateForm={validateProfileForm}/>;
};

export default EditUserDetailsPage;
