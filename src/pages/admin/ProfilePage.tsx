import { useSelector } from "react-redux";
import Profile from "../../Components/Profile";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { User } from "../../redux/auth/auth.types";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { updateCurrentuserProfile } from "../../redux/auth/auth.thunk";
import { validateProfileForm } from "../../utils/validateForms";

const ProfilePage = () => {
  const adminDetails = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateAdminDetails = async (adminData: User) => {
    try {
      const response = await dispatch(
        updateCurrentuserProfile({ userData: adminData })
      );

      console.log("response rece", response);
      showSuccessToast(`Your account details has been updated successfully`);
    } catch (error) {
      console.log("Failed to update admin details, Please try again");
      showErrorToast("Failed to update your details, Please try again");
    }
  };

  return (
    <>
      <Profile
        profileData={adminDetails as User}
        onSave={handleUpdateAdminDetails}
        validateForm={validateProfileForm}
        isLoading={isLoading}
      />
    </>
  );
};

export default ProfilePage;
