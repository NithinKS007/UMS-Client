import { useDispatch } from "react-redux";
import Profile from "../../Components/Profile";
import { AppDispatch } from "../../redux/store";
import { User } from "../../redux/auth/auth.types";
import { createUser } from "../../redux/admin/admin.thunk";
import { showErrorToast, showSuccessToast } from "../../utils/toast";

const AddUserPage: React.FC = () => {

  const dispatch = useDispatch<AppDispatch>()


  const handleSave = async (newuserData:User) => {

    try {
      
      console.log("user data received for adding",newuserData);
      
     const response =  await dispatch(createUser(newuserData))

     showSuccessToast(`user added successfully`)

     console.log("response",response);
     
      console.log("user added to the database successfully");
      
    } catch (error) {
     
      console.log("error adding user to the database");

      showErrorToast(`Failed to create user`)
      
    }
  }
  return (
    <>
      <Profile profileData={null} onSave={handleSave}/>
    </>
  );
};

export default AddUserPage;
