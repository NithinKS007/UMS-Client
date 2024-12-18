import { useDispatch } from "react-redux";
import Profile from "../../Components/Profile";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { updateCurrentuserProfile } from "../../redux/auth/auth.thunk";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { User } from "../../redux/auth/auth.types";

const HomePage = () => {
  const userDetails = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch<AppDispatch>();

  const handleUpdateuserDetails = async (userData: any) => {
    console.log("user data received for updation", userData);

    try {
      await dispatch(updateCurrentuserProfile({ userData: userData }));
      showSuccessToast(`Your account details has been updated successfully`);
    } catch (error) {
      console.log("Failed to update admin details, Please try again");
      showErrorToast("Failed to update your details, Please try again");
    }
  };

  return (
    <>
      <Profile
        profileData={userDetails as User}
        onSave={handleUpdateuserDetails}
      />
    </>
  );
};

export default HomePage;
