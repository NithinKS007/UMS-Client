import { useDispatch } from "react-redux";
import Profile from "../../Components/Profile";
import { AppDispatch, RootState } from "../../redux/store";
import { User } from "../../redux/auth/auth.types";
import { createUser } from "../../redux/admin/admin.thunk";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { validateAdduserForm } from "../../utils/validateForms";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddUserPage: React.FC = () => {
  const isLoading = useSelector((state: RootState) => state.admin.isLoading);

  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const handleSave = async (newuserData: User) => {
    try {
      await dispatch(createUser(newuserData));
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      showSuccessToast(`user added successfully`);
    } catch (error) {
      console.log("error adding user to the database");
      showErrorToast(`Failed to create user`);
    }
  };
  return (
    <>
      <Profile
        profileData={null}
        onSave={handleSave}
        validateForm={validateAdduserForm}
        isLoading={isLoading}
      />
    </>
  );
};

export default AddUserPage;
