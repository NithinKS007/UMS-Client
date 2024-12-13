import Profile from "../../Components/Profile";
import TopNavbar from "../../Components/TopNavbar";
import SideNavbar from "../../Components/SideNavbar";

const ProfilePage = () => {
  return (
    <div className="flex flex-col min-h-screen">
    <TopNavbar />
    <div className="flex flex-1 ">
      <SideNavbar />
      <div className="flex-1 p-4 pt-24">
        <Profile  />
      </div>
    </div>
  </div>
  )
}

export default ProfilePage
