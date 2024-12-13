import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Profile: React.FC = () => {
  const admin = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="lg:max-w-2xl xl:max-w-2xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
      <div className="bg-gradient-to-r from-blue-800 to-blue-500 p-6 flex items-center">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md mr-4">
          <img 
            src="https://via.placeholder.com/150" 
            alt="Profile"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">{`${admin?.fname} ${admin?.lname}`}</h2>
        </div>
      </div>

      <div className="p-6 grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <p className="text-sm text-black mb-1">Contact Information</p>
            <a href={`tel:${admin?.phone}`} className="text-black">
              {admin?.phone?.toLocaleString()}
            </a>
            <br />
            <a href={`mailto:${admin?.email}`} className="text-black">
              {admin?.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
