import React, { useState } from "react";

const SendEmailCon = ({ setSendEmail }) => {
  const [emailDetails, setEmailDetails] = useState({
    recipientEmails: "",
    subject: "",
    body: "",
    senderEmail: "",
    senderPassword: "",
    replyToEmail: "",
    senderName: "",
    recipientnames: "",
    attachment_urls: [],
    tempID: null,
    dataIDs: [],
    userIDs: [],
  });

  const [selectedService, setSelectedService] = useState("outlook-smtp");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmailDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);

    const urlMap = {
      "outlook-smtp": "https://margda.in:7000/api/email/send-email/outlook-smtp",
      "outlook-graph": "https://margda.in:7000/api/email/send-email/outlook-graph-api",
      aws: "https://margda.in:7000/api/email/send-email/aws",
    };
    const url = urlMap[selectedService];

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailDetails),
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Send Email</h2>
          <button
            onClick={() => setSendEmail(false)}
            className="text-red-500 hover:text-red-700"
          >
            ✖
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="recipientEmails" className="font-bold mb-2">
              Recipient Emails 
            </label>
            <input
              type="text"
              name="recipientEmails"
              id="recipientEmails"
              value={emailDetails.recipientEmails}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter recipient emails"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="subject" className="font-bold mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              value={emailDetails.subject}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter subject"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="body" className="font-bold mb-2">
              Body
            </label>
            <textarea
              name="body"
              id="body"
              value={emailDetails.body}
              onChange={handleChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="Enter email body"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="emailService" className="font-bold mb-2">
              Select Email Service
            </label>
            <select
              id="emailService"
              value={selectedService}
              onChange={handleServiceChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="outlook-smtp">Outlook SMTP</option>
              <option value="outlook-graph">Outlook Graph API</option>
              <option value="aws">AWS SES</option>
            </select>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Email"}
            </button>
            <button
              type="button"
              onClick={() => setSendEmail(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendEmailCon;
