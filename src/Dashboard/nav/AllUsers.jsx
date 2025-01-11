import { useEffect, useState, useRef } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaWhatsapp,
  FaEdit,
  FaTrash,
  FaSearch,
  FaChevronDown,
  FaUserCog,
  FaDatabase,
  FaMapMarkerAlt,
  FaClipboardList,
  FaStickyNote,
  FaSlidersH,
  FaUpload,
  FaSave,
  FaTimes,
  FaInfoCircle,
  FaBriefcase,
  FaGraduationCap,
  FaHeart,
  FaBan,
  FaLink,
  FaUserCircle,
} from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import the styles
import UserVariableForm from "../admin/tableform/UserVariableForm";

const AllUsers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isPincodeDropdownOpen, setIsPincodeDropdownOpen] = useState(false);
  const [pincodeSearch, setPincodeSearch] = useState("");
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [file, setFile] = useState(null);
  //   const [formData, setFormData] = useState(initialFormState);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataDetails, setDataDetails] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null); // Track which row is being edited
  const [editingData, setEditingData] = useState({}); // Store temporary edits
  const [selectedRows, setSelectedRows] = useState(new Set()); // Track selected rows
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission
  const [saveLoading, setSaveLoading] = useState(false); // Loading state for save operation

  const userData = JSON.parse(localStorage.getItem("userData"));
  const loginUserID = userData ? userData.user_data.userID : null;
  const accessToken = userData ? userData.access_token : null;

  useEffect(() => {
    fetchData();
  }, []);

  const handleVariableClick = (user) => {
    setSelectedUser(user);
    setShowForm(true);
  };

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/admin/getallusers",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          setData([]);
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API response:", result);
      setData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      //   setError("Failed to fetch data. Please try again.");
    }
  };

  const handleSave = async (newData) => {
    try {
      const update = await fetch(
        "https://margda.in:7000/api/admin/edit-variable",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID: selectedUser.userID,
            email: newData.officeEmail,
            email_pass: newData.emailPasscode,
            mobile: newData.officeMobile,
            did: newData.didNumber,
            data_limit: newData.dataLimit,
            data_view: newData.dataView,
            lead_limit: newData.leadLimit,
            whatsapp_limit: newData.whatsApSLimit,
            whatsapp_api_limit: newData.whatsApILimit,
            email_limit: newData.emailLimit,
            sms_limit: newData.smsLimit,
            sns_limit: newData.snsLimit,
            call_limit: newData.callLimit,
            meet_limit: newData.meetLimit,
            team_limit: newData.teamLimit,
            self_income: newData.selfIncome,
            team1_income: newData.team1Income,
            team2_income: newData.team2Income,
            team3_income: newData.team3Income,
            refer_income: newData.referIncome,
            pincode_income: newData.pinCodeIncome,
            district_income: newData.districtIncome,
            state_income: newData.stateIncome,
            country_income: newData.countryIncome,
            royalty_income: newData.royaltyIncome,
            call_wallet: newData.callWallet,
            meet_wallet: newData.meetWallet,
            business: newData.businessMonthly,
            validate_date: newData.validDate,
          }),
        }
      );
      const data = await update.json();
      if (update.ok) {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
    setShowForm(false); // Close the form
    setSelectedUser(null); // Reset selected user
  };

  // Delete record
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `https://margda.in:7000/api/margda.org/delete-data`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dataID: id }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("API response after deletion:", result);

      // Update local state to remove the deleted record
      setDataDetails((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
      setError("Failed to delete the record. Please try again.");
    }
  };
  // Inline Editing Handlers
  const handleEdit = (id) => {
    const recordToEdit = dataDetails.find((item) => item.id === id);
    setEditingData(recordToEdit);
    setEditingId(id);
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditingData({});
  };

  const handleEditInputChange = (e, field) => {
    const { value } = e.target;
    setEditingData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  // Filtering and pagination
  const filteredData = dataDetails.filter((item) =>
    Object.values(item).some((value) =>
      value?.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleRecordsPerPageChange = (e) => {
    const value = parseInt(e.target.value, 10); // Parse the input value as an integer
    if (value < 1) {
      setRecordsPerPage(1); // Set to 1 if the value is less than 1
    } else {
      setRecordsPerPage(value); // Otherwise, set the value
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-8 min-h-screen">
      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-md p-6 mt-9">
        {data.length > 0 ? (
          <div className="max-h-[600px] overflow-y-auto">
            <table className="w-full text-sm text-left border-spacing-x-4">
              <thead>
                <tr className="text-gray-600 sticky top-0 bg-white z-10">
                  <th className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <FaUserCog className="text-blue-600 w-4 h-4" />
                      <span>Action</span>
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <FaDatabase className="text-purple-600 w-4 h-4" />
                      <span>Data</span>
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-green-600 w-4 h-4" />
                      <span>Location</span>
                    </div>
                  </th>
                  <th className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <FaClipboardList className="text-yellow-600 w-4 h-4" />
                      <span>Log</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item) => (
                  <tr
                    key={item.userID}
                    className={`hover:bg-gray-50 transition-colors duration-200 ${
                      selectedRows.has(item.userID) ? "bg-blue-50" : ""
                    }`}
                  >
                    <td className="px-4 py-3">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            className="form-checkbox h-4 w-4 text-blue-500 border-blue-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-gray-600">(pic)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaEdit className="text-blue-500" />
                          <span className="text-blue-500">Edit</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaTrash className="text-red-500" />
                          <span className="text-red-500">Delete</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaInfoCircle className="text-red-500" />
                          <span className="text-red-500">Invalid</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaBan className="text-gray-500" />
                          <span className="text-gray-600">Inactive</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaSlidersH className="text-purple-500" />
                          <span
                            className="text-purple-500 cursor-pointer"
                            onClick={() => handleVariableClick(item)}
                          >
                            Variable
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaLink className="text-green-500" />
                          <span className="text-green-500">Link</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaUserCircle className="text-orange-500" />
                          <span className="text-orange-500">Account</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <FaUser className="text-blue-400 w-4 h-4" />
                          {editingId === item.userID ? (
                            <input
                              type="text"
                              value={editingData.name || ""}
                              onChange={(e) => handleEditInputChange(e, "name")}
                              className="border border-gray-300 p-1 rounded"
                            />
                          ) : (
                            <span className="font-medium text-black">
                              {item.name || "N/A"}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaEnvelope className="text-purple-400 w-4 h-4" />
                          {editingId === item.userID ? (
                            <input
                              type="email"
                              value={editingData.email || ""}
                              onChange={(e) =>
                                handleEditInputChange(e, "email")
                              }
                              className="border border-gray-300 p-1 rounded"
                            />
                          ) : (
                            <span className="text-black">
                              {item.email || "N/A"}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaPhone className="text-green-400 w-4 h-4" />
                          {editingId === item.userID ? (
                            <input
                              type="text"
                              value={editingData.phone || ""}
                              onChange={(e) =>
                                handleEditInputChange(e, "phone")
                              }
                              className="border border-gray-300 p-1 rounded"
                            />
                          ) : (
                            <span className="text-black">
                              {item.mobile || "N/A"}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaWhatsapp className="text-green-500 w-4 h-4" />
                          {editingId === item.userID ? (
                            <input
                              type="text"
                              value={editingData.whatsapp || ""}
                              onChange={(e) =>
                                handleEditInputChange(e, "whatsapp")
                              }
                              className="border border-gray-300 p-1 rounded"
                            />
                          ) : (
                            <span className="text-black">
                              {item.whatsapp || "N/A"}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaVenusMars className="text-pink-400 w-4 h-4" />
                          {editingId === item.userID ? (
                            <select
                              value={editingData.gender || "Female"}
                              onChange={(e) =>
                                handleEditInputChange(e, "gender")
                              }
                              className="border border-gray-300 p-1 rounded"
                            >
                              <option value="Female">Female</option>
                              <option value="Male">Male</option>
                              <option value="Other">Other</option>
                            </select>
                          ) : (
                            <span className="text-black">
                              {item.gender || "N/A"}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-2">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                          <p className="text-xs text-black">
                            City: {item.placeID || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                          <p className="text-xs text-black">
                            State: {item.placeID || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                          <p className="text-xs text-black">
                            Country: {item.placeID || "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaMapMarkerAlt className="text-green-400 w-4 h-4" />
                          <p className="text-xs text-black">
                            Pincode: {item.placeID || "N/A"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <FaClipboardList className="text-yellow-500 w-4 h-4" />
                          <span className="text-black">
                            {new Date(item.edate).toLocaleString() || "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <FaStickyNote className="text-red-400 w-4 h-4" />
                          {editingId === item.userID ? (
                            <input
                              type="text"
                              value={editingData.edate || ""}
                              onChange={(e) =>
                                handleEditInputChange(e, "remarks")
                              }
                              className="border border-gray-300 p-1 rounded"
                            />
                          ) : (
                            <span className="text-black">
                              {item.remarks || "No remarks"}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <>You don't have access of this page</>
        )}
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to{" "}
          {Math.min(indexOfLastRecord, filteredData.length)} of{" "}
          {filteredData.length} records
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 bg-gray-200 text-gray-700 rounded ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            {"<<"} Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 ${
                currentPage === page
                  ? "bg-orange-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              } rounded`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 bg-gray-200 text-gray-700 rounded ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-300"
            }`}
          >
            Next {">>"}
          </button>
        </div>
      </div>
      {showForm && (
        <UserVariableForm
          user={selectedUser}
          onClose={handleCloseForm}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default AllUsers;
