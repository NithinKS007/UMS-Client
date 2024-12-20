import { useDispatch } from "react-redux";
import Profile from "../../Components/Profile";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { updateCurrentuserProfile } from "../../redux/auth/auth.thunk";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { User } from "../../redux/auth/auth.types";
import { validateProfileForm } from "../../utils/validateForms";

const HomePage = () => {
  const userDetails = useSelector((state: RootState) => state.auth.user);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateuserDetails = async (userData: User) => {
    try {
      await dispatch(updateCurrentuserProfile({ userData: userData }));
      showSuccessToast(`Your account details has been updated successfully`);
    } catch (error) {
      console.log("Failed to update user details, Please try again");
      showErrorToast("Failed to update user details, Please try again");
    }
  };

  return (
    <>
      <Profile
        profileData={userDetails as User}
        onSave={handleUpdateuserDetails}
        validateForm={validateProfileForm}
        isLoading={isLoading}
      />
    </>
  );
};

export default HomePage;
