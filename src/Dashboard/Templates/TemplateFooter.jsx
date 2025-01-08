import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

 const TemplatesFooter = () => {
  const [entriesToShow, setEntriesToShow] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentData, setCurrentData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [templates, setTemplates] = useState([]);
  const [showFilteredFrom, setShowFilteredFrom] = useState(true);
  const [userID, setUserID] = useState(null);
  const [viewTemplate, setViewTemplate] = useState(false);
  const [viewedTemplateData, setViewedTemplateData] = useState(null);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const userId = localStorage.getItem("userID");
    setUserID(userId);
    if (!userId) return setTemplates([]);

    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/templates/get-templates",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userID: userId }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch templates");
      const data = await response.json();
      setTemplates(data.Templates);
      setTotalPages(Math.ceil(data.Templates.length / entriesToShow));
      setCurrentData(data.Templates);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const handleDeleteTemplate = async (tempID) => {
    if (!window.confirm("Are you sure you want to delete this template?")) {
      return;
    }
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/templates/delete-template",
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tempID }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setCurrentData((prevData) =>
          prevData.filter((template) => template.tempID != tempID)
        );
        setTemplates((prevData) =>
          prevData.filter((template) => template.tempID != tempID)
        );
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const data = filteredTemplates.slice(
      (page - 1) * entriesToShow,
      page * entriesToShow
    );

    setCurrentData(data);
    setTotalPages(Math.ceil(filteredTemplates.length / entriesToShow));
  }, [entriesToShow, page, searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [entriesToShow]);

  const filteredTemplates = templates.filter(
    (template) =>
      (template.template &&
        template.template.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (template.temptype &&
        template.temptype.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  useEffect(() => {
    setPage(1);
    if (searchTerm !== "") {
      setShowFilteredFrom(true);
    } else {
      setShowFilteredFrom(false);
    }
  }, [searchTerm]);

  return (
    <div>
      {viewTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="w-2/3 max-h-[90%] bg-white rounded p-4 overflow-y-scroll">
            <div className="flex flex-row items-center text-center">
              <div className="w-full">
                <h2 className="text-lg font-semibold">Template</h2>
              </div>
              <div
                onClick={() => setViewTemplate(false)}
                className="my-auto font-normal border px-3 bg-gray-200 text-red-500 cursor-pointer hover:bg-red-400 hover:text-red-100 rounded"
              >
                x
              </div>
            </div>
            <div className="flex flex-row text-base font-normal justify-between w-full">
              <div className="flex flex-col items-start w-full">
                <label htmlFor="template-type" className="font-bold p-1">
                  Template Type
                </label>
                <input
                  disabled
                  type="text"
                  value={
                    viewedTemplateData.temptype === "WS"
                      ? "Scan Whatsapp"
                      : viewedTemplateData.temptype === "WA"
                      ? "Whatsapp Api"
                      : viewedTemplateData.temptype.trim() === "E"
                      ? "Email"
                      : viewedTemplateData.temptype.trim() === "S"
                      ? "SMS"
                      : viewedTemplateData.temptype
                  }
                  placeholder="Enter Template Name Here"
                  className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
                />
              </div>
              <div className="flex flex-col items-start w-full">
                <label htmlFor="template-name" className="font-bold p-1">
                  Template Name
                </label>
                <input
                  disabled
                  type="text"
                  value={viewedTemplateData.template}
                  placeholder="Enter Template Name Here"
                  className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
                />
              </div>
            </div>
            {viewedTemplateData.subject || viewedTemplateData.auth ? (
              <div className="flex flex-row text-base font-normal justify-between w-1/2 mt-4">
                <div className="flex flex-col items-start w-full">
                  <label htmlFor="template-id" className="font-bold p-1">
                    {viewedTemplateData.subject
                      ? "Subject"
                      : viewedTemplateData.auth
                      ? "Template ID"
                      : ""}
                  </label>
                  <input
                    type="text"
                    name="template-subject"
                    id="template-subject"
                    value={
                      viewedTemplateData.subject || viewedTemplateData.auth
                    }
                    placeholder="Enter Subject Here"
                    className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
            {viewedTemplateData.bimg_url && (
              <a
                href={viewedTemplateData.bimg_url}
                className="w-max flex"
                target="_blank"
              >
                <span className="flex items-start justify-start border border-gray-300 rounded p-2 mt-3 text-base font-normal hover:bg-slate-200 hover:underline">
                  {"Header File"}
                </span>
              </a>
            )}
            <div className="flex flex-col items-start w-full">
              <label htmlFor="message" className="font-bold p-1 text-base">
                Message
              </label>
              <textarea
                disabled
                value={viewedTemplateData.matter}
                id="message"
                className="px-3  w-full mb-4 py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
                rows="13"
              />
            </div>
            {viewedTemplateData.matter.toLowerCase().includes("<html") && (
              <div className="flex flex-col justify-start items-start">
                <label htmlFor="preview" className="text-base font-bold p-1">
                  Preview
                </label>
                <div
                  id="preview"
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginTop: "10px",
                    overflowX: "scroll",
                  }}
                  className="w-full p-2 mb-4 border-gray-300 flex flex-col items-start text-base"
                  dangerouslySetInnerHTML={{
                    __html: viewedTemplateData.matter
                      ? viewedTemplateData.matter
                      : "Preview Will be Show Here",
                  }}
                />
              </div>
            )}
            {viewedTemplateData.attach_url &&
              viewedTemplateData.attach_url.length > 0 &&
              !viewedTemplateData.attach_url.length > 0 &&
              viewedTemplateData.attach_url.map((url, index) => (
                <a href={url} className="w-max" target="_blank">
                  <div className="flex items-start justify-start border border-gray-300 rounded p-2 mt-3 text-base font-normal w-full">
                    {`${index + 1}. Attachment`}
                  </div>
                </a>
              ))}
          </div>
        </div>
      )}
      <div
        className="bg-gray-100 flex flex-row justify-center items-center"
        style={{ width: "100%" }}
      >
        <div
          className="flex justify-center flex-col items-between bg-white m-5"
          style={{ minWidth: "95%" }}
        >
          <div className="flex flex-row justify-between m-5">
            <div>Footer</div>
            <div>
              <Link
                to={"/add-footer"}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-normal font-mono text-base"
              >
                Add Footer
              </Link>
            </div>
          </div>

          <div
            style={{
              backgroundColor: "rgb(184 197 225)",
              width: "100%",
              height: "1px",
            }}
          ></div>
          <div className="bg-white px-4 border-1 rounded shadow-lg">
            <div className="flex justify-between items-center my-2 w-[100%]">
              <div>
                <label htmlFor="entries" className="mr-2 text-gray-700 text-sm">
                  Show Entries:
                </label>
                <select
                  id="entries"
                  value={entriesToShow}
                  onChange={(e) => setEntriesToShow(Number(e.target.value))}
                  className="p-[2px]  border text-[20px] font-normal  border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-300"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <div className="items-end">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="p-1 border border-slate-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder:text-slate-900 font-light text-xl"
                />
              </div>
            </div>

            {currentData.length === 0 ? (
              <div className="text-center text-gray-600 p-20">
                No Footer found
              </div>
            ) : (
              <div>
                <div className="rounded-lg shadow-lg max-h-[600px] overflow-y-scroll min-h-[400px]">
                  <table className="min-w-full table-auto border-collapse">
                    <thead>
                      <tr className="bg-gray-800 text-white text-center  ">
                        <th className="w-1/3 py-3 pl-5 text-justify uppercase font-semibold text-sm">
                          Type
                        </th>
                        <th className="w-1/3 py-3 text-justify uppercase font-semibold text-sm">
                          Template
                        </th>
                        <th className="w-1/3 py-3 text-justify uppercase font-semibold text-sm">
                          Share
                        </th>
                        <th className="py-3 text-justify uppercase font-semibold text-sm flex justify-end pr-16">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentData
                        .slice(0, entriesToShow)
                        .map((template, index) => (
                          <tr
                            key={index}
                            className="border-t hover:bg-gray-100 cursor-pointer "
                          >
                            <td className="w-1/4 py-3 pl-5 text-left text-base font-sans font-normal ">
                              {template.temptype}
                            </td>
                            <td className="w-1/4 py-3 text-left  text-base font-sans font-normal ">
                              {template.template}
                            </td>
                            <td className="w-1/4 py-3  text-left text-base font-sans font-normal ">
                              {template.share ? "Y" : "N"}
                            </td>
                            <td className="w-1/4 py-3 flex  text-left font-sans font-normal">
                              <div>
                                {template.euser == userID && (
                                  <Link
                                    to={"/dashboard/edit-template"}
                                    state={{ tempID: template.tempID }}
                                  >
                                    <FaEdit className="cursor-pointer text-blue-500 ml-2" />
                                  </Link>
                                )}
                              </div>
                              {template.euser == userID && (
                                <button
                                  className="cursor-pointer text-blue-500 ml-2"
                                  onClick={(e) => {
                                    e.stopPropagation(); // Prevent row click
                                    handleDeleteTemplate(template.tempID);
                                  }}
                                >
                                  <FaTrash />
                                </button>
                              )}
                              <button>
                                <FaEye
                                  className="cursor-pointer text-blue-500 ml-2"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setViewedTemplateData(templates[index]);
                                    setViewTemplate(true);
                                  }}
                                />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex flex-row justify-between my-3">
                  <div className="flex flex-row">
                    {page === totalPages ? (
                      <div className="text-base font-light ">
                        Showing {(page - 1) * entriesToShow + 1} to{" "}
                        {filteredTemplates.length} of {filteredTemplates.length}{" "}
                        entries{" "}
                      </div>
                    ) : (
                      <div className="text-base font-light ">
                        Showing {(page - 1) * entriesToShow + 1} to{" "}
                        {page * entriesToShow} of {filteredTemplates.length}{" "}
                        entries{" "}
                      </div>
                    )}
                    {
                      <div className="font-light text-base ml-2">
                        {showFilteredFrom &&
                          `(filtered from ${templates.length} entries)`}
                      </div>
                    }
                  </div>
                  <div className="flex justify-center space-x-2">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(page - 1)}
                      disabled={page === 1}
                      className="px-3 py-1 text-sm font-normal border hover:bg-slate-600 cursor-pointer hover:text-white"
                    >
                      Previous
                    </button>

                    {/* Page Numbers */}
                    {totalPages <= 5 ? (
                      // Show all pages if totalPages is less than or equal to 5
                      Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index}
                          onClick={() => handlePageChange(index + 1)}
                          className={`px-3 py-2 font-normal text-sm rounded hover:bg-slate-500 hover:text-white ${
                            page === index + 1 ? "bg-slate-500 text-white" : ""
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))
                    ) : (
                      <>
                        {/* First page */}
                        <button
                          onClick={() => handlePageChange(1)}
                          className={`px-3 py-2 font-normal text-sm rounded hover:bg-slate-500 hover:text-white ${
                            page === 1 ? "bg-slate-500 text-white" : ""
                          }`}
                        >
                          1
                        </button>

                        {/* Second page */}
                        {page === 2 && (
                          <button
                            onClick={() => handlePageChange(2)}
                            className={`px-3 py-2 font-normal text-sm rounded hover:bg-slate-500 hover:text-white ${
                              page === 2 ? "bg-slate-500 text-white" : ""
                            }`}
                          >
                            2
                          </button>
                        )}

                        {/* Ellipsis */}
                        {page > 3 && (
                          <span className="px-3 py-2 font-normal text-sm">
                            ...
                          </span>
                        )}

                        {/* Current page */}
                        {page > 2 && page < totalPages - 1 && (
                          <button
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 font-normal text-sm rounded hover:bg-slate-500 hover:text-white bg-slate-500 text-white`}
                          >
                            {page}
                          </button>
                        )}

                        {/* Ellipsis for remaining pages */}
                        {page < totalPages - 2 && (
                          <span className="px-3 py-2 font-normal text-sm">
                            ...
                          </span>
                        )}
                        {page === totalPages - 1 && (
                          <button
                            onClick={() => handlePageChange(2)}
                            className={`px-3 py-2 font-normal text-sm rounded hover:bg-slate-500 hover:text-white ${
                              page === totalPages - 1
                                ? "bg-slate-500 text-white"
                                : ""
                            }`}
                          >
                            {totalPages - 1}
                          </button>
                        )}

                        {/* Last page */}
                        <button
                          onClick={() => handlePageChange(totalPages)}
                          className={`px-3 py-2 font-normal text-sm rounded hover:bg-slate-500 hover:text-white ${
                            page === totalPages ? "bg-slate-500 text-white" : ""
                          }`}
                        >
                          {totalPages}
                        </button>
                      </>
                    )}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(page + 1)}
                      disabled={page === totalPages}
                      className="px-3 py-1 text-sm font-normal border hover:bg-slate-600 cursor-pointer hover:text-white"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "rgb(184 197 225)",
          width: "100%",
          height: "1px",
        }}
      ></div>
      <div className="flex flex-row text-base font-normal">
        Copyright @ 2024 <p className="text-blue-500">Margdarshak</p>. All
        rights reserved.
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default TemplatesFooter