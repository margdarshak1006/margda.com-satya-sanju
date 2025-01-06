import React, { useState } from 'react';
import Logo from '../../assets/margdarshakendra-logo.webp'; 
import Pic from '../../assets/m.jpeg'; 

const ProfilePage = () => {
  const [formValues, setFormValues] = useState({
    name: '',
    gender: '',
    mobile: '9876543210', // Example mobile number (disabled field)
    whatsap: '',
    email: '',
    dob: '',
    address: '',
    placeID: '',
    pic_url: 'https://cdn.pixabay.com/photo/2016/04/01/10/11/avatar-1299805_1280.png',
  });

  const handleOnInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormValues({ ...formValues, pic_url: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formValues);
  };

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center px-2 sm:px-6 lg:px-8">
        <div className="bg-white p-2 sm:p-8 w-full max-w-4xl shadow-lg rounded-xl mx-2 sm:mx-16">
          <div className="text-center mb-4 sm:mb-6">
            {/* Logo */}
            <div className="flex justify-center sm:justify-start">
              <img src={Logo} alt="Logo" className="w-20 sm:w-32 h-auto" />
            </div>

            <h2 className="text-lg sm:text-2xl font-bold text-gray-800 mt-2 sm:mt-4">Complete Your Profile</h2>
            <p className="text-xs sm:text-base text-gray-500 mt-1 sm:mt-2">Help us know you better by filling out the details below.</p>
          </div>

          {/* Form */}
          <div className="bg-white p-2 sm:p-6 shadow-sm rounded-lg">
            <form className="space-y-2 sm:space-y-6" onSubmit={handleSubmit}>
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center mb-2 sm:mb-6">
                <img
                  src={Pic}
                  alt="Profile Picture"
                  className="w-16 h-16 sm:w-24 sm:h-24 rounded-full border-2 sm:border-4 border-blue-500 shadow-md mb-1 sm:mb-4"
                />
                <label
                  htmlFor="profilePic"
                  className="text-xs sm:text-sm text-blue-600 cursor-pointer hover:underline"
                >
                  Upload Profile Picture
                </label>
                <input
                  type="file"
                  onChange={handleProfilePicChange}
                  accept="image/*"
                  id="profilePic"
                  className="hidden"
                />
              </div>

              {/* Name, Gender, and DOB Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                <div>
                  <label htmlFor="name" className="text-xs sm:text-sm font-medium text-gray-700 block text-left">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleOnInputChange}
                    value={formValues.name}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="gender" className="text-xs sm:text-sm font-medium text-gray-700 block text-left">
                    Gender
                  </label>
                  <select
                    name="gender"
                    onChange={handleOnInputChange}
                    value={formValues.gender}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 sm:px-3 sm:py-2 text-gray-600 focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                </div>
              </div>

              {/* Mobile, WhatsApp, Email Section */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                <div>
                  <label htmlFor="mobile" className="text-xs sm:text-sm font-medium text-gray-700 block text-left">
                    Mobile
                  </label>
                  <input
                    type="text"
                    value={formValues.mobile}
                    disabled
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 sm:px-3 sm:py-2 bg-gray-100 text-gray-600 outline-none text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="whatsap" className="text-xs sm:text-sm font-medium text-gray-700 block text-left">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    name="whatsap"
                    value={formValues.whatsap}
                    onChange={handleOnInputChange}
                    placeholder="Enter WhatsApp Number"
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-xs sm:text-sm font-medium text-gray-700 block text-left">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={handleOnInputChange}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* DOB, Address, Pin Code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                <div>
                  <label htmlFor="dob" className="text-xs sm:text-sm font-medium text-gray-700 block text-left">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formValues.dob}
                    onChange={handleOnInputChange}
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="text-xs sm:text-sm font-medium text-gray-700 block text-left">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formValues.address}
                    onChange={handleOnInputChange}
                    placeholder="Enter your address"
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="placeID" className="text-xs sm:text-sm font-medium text-gray-700 block text-left">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    name="placeID"
                    value={formValues.placeID}
                    onChange={handleOnInputChange}
                    placeholder="Pin Code"
                    className="w-full border border-gray-300 rounded-lg px-2 py-1 sm:px-3 sm:py-2 focus:ring-2 focus:ring-blue-400 outline-none text-xs sm:text-sm"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-4 sm:mt-8 text-center">
                <button
                  type="submit"
                  className="w-full py-1 sm:py-3 px-2 sm:px-6 bg-orange-500 text-white rounded-lg font-semibold text-sm sm:text-lg hover:bg-orange-600 focus:ring-4 focus:ring-blue-300 transition ease-in-out duration-200"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-black text-center py-2 sm:py-4 mt-4 sm:mt-6">
        <p className="text-xs sm:text-sm">&copy; 2024 Margdarshak Media. All rights reserved.</p>
      </footer>
    </>
  );
};

export default ProfilePage;