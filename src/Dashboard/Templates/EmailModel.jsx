import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons
import Loader from "./Loader";

 const EmailModel = ({ setShowEmailModel, selectedLeads }) => {
  const [selectedEmail, setSelectedEmail] = useState("");
  const [customEmail, setCustomEmail] = useState("");
  const [customPassword, setCustomPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [emailBody, setEmailBody] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [replyToEmail, setReplyToEmail] = useState("");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    const userId = localStorage.getItem("userID");
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
      const filterTemplates = data.Templates.filter(
        (template) => template.temptype.trim() === "E"
      );
      setTemplates(filterTemplates);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const handleEmailChange = (e) => {
    setSelectedEmail(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSendEmail = async () => {
    if (!selectedEmail) {
      return alert("Select a method to send email");
    }
    if (!selectedTemplate) {
      return alert("Select a template");
    }
    setLoading(true);
    const token = localStorage.getItem("push-notification-token");
    const recipientEmails =
      selectedLeads.length > 0 ? selectedLeads.map((lead) => lead.email) : []; // Use single recipient if sending individual email
    const recipientNames =
      selectedLeads.length > 0 ? selectedLeads.map((lead) => lead.name) : [];
    const dataIDs =
      selectedLeads.length > 0 ? selectedLeads.map((lead) => lead.dataID) : [];
    const userIDs =
      selectedLeads.length > 0 ? selectedLeads.map((lead) => lead.userID) : [];
    if (recipientEmails.length === 0) {
      alert("No leads selected.");
      return;
    }
    let emailPayload;
    let apiUrl;
    const mobile = localStorage.getItem("mobile");
    const whatsapp = localStorage.getItem("whatsap");
    const email = localStorage.getItem("email");
    const name = localStorage.getItem("name");
    const userID = localStorage.getItem("userID");
    const pic = localStorage.getItem("picUrl");
    const tempID = selectedTemplate.tempID;
    const formatBody = emailBody
      .replace("{{whatsapp}}", whatsapp)
      .replace("{{email}}", email)
      .replace("{{euser}}", name)
      .replace("{{mobile}}", mobile)
      .replace("{{pic}}", pic);
    if (selectedEmail === "admin") {
      emailPayload = {
        tempID,
        userID,
        recipientEmail: recipientEmails,
        subject: emailSubject,
        body: formatBody,
        fromOfficialAccount: "true",
        senderName: name,
        recipientnames: recipientNames,
        replyToEmail: replyToEmail,
        token: token,
        ...(Array.isArray(selectedTemplate.attach_url) &&
          selectedTemplate.attach_url.length > 0 && {
            attachment_urls: selectedTemplate.attach_url,
          }),
      };
      apiUrl = "https://margda.in:7000/api/sendemail";
    } else if (selectedEmail === "custom") {
      if (!customEmail || !customPassword) {
        setLoading(false);
        return alert("Provide custom email and password");
      }
      emailPayload = {
        tempID,
        userID,
        recipientEmail: recipientEmails,
        subject: emailSubject,
        body: formatBody,
        senderEmail: customEmail,
        senderPassword: customPassword,
        senderName: name,
        recipientnames: recipientNames,
        replyToEmail: replyToEmail,
        token: token,
        ...(Array.isArray(selectedTemplate.attach_url) &&
          selectedTemplate.attach_url.length > 0 && {
            attachment_urls: selectedTemplate.attach_url,
          }),
      };
      apiUrl = "https://margda.in:7000/api/sendemail";
    } else if (selectedEmail === "aws") {
      emailPayload = {
        tempID,
        userID,
        recipientEmails: recipientEmails,
        recipientnames: recipientNames,
        subject: emailSubject,
        body: formatBody,
        senderName: name,
        replyToEmail: replyToEmail,
        token: token,
        attachment_urls: selectedTemplate.attach_url,
      };
      apiUrl = "https://margda.in:7000/api/aws/sendemail";
    } else if (selectedEmail === "outlook") {
      emailPayload = {
        tempID,
        userID,
        recipientemails: recipientEmails,
        subject: emailSubject,
        body: formatBody,
        recipientnames: recipientNames,
        senderName: name,
        replyTo: replyToEmail,
        token: token,
        attachment_urls: selectedTemplate.attach_url,
        dataIDs: dataIDs,
        userIDs: userIDs,
      };
      apiUrl = "https://margda.in:7000/api/margda/sendemail/outlook";
    } else if (selectedEmail === "smtp_outlook") {
      if (!customEmail || !customPassword) {
        setLoading(false);
        return alert("Provide custom email and password");
      }
      emailPayload = {
        tempID,
        userID,
        recipientEmails: recipientEmails,
        subject: emailSubject,
        body: formatBody,
        recipientnames: recipientNames,
        senderEmail: customEmail,
        senderPassword: customPassword,
        senderName: name,
        replyToEmail: replyToEmail,
        token: token,
        attachment_urls: selectedTemplate.attach_url,
        dataIDs: dataIDs,
        userIDs: userIDs,
      };
      apiUrl = "https://margda.in:7000/api/margda/sendemail/smtp_outlook";
    }
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        console.log(data);
        const message = data.message.responses;
        alert(JSON.stringify(message));
      } else {
        alert("Failed to send email." + data.message);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sending email:", error);
      alert("An error occurred while sending the email.");
    }
  };

  const handleTemplateChange = (e) => {
    if (e.target.value !== "") {
      console.log(templates[e.target.value]);
      setSelectedTemplate(templates[e.target.value]);
      setEmailSubject(templates[e.target.value].subject);
      setEmailBody(templates[e.target.value].matter);
    } else {
      setSelectedTemplate("");
      setEmailSubject("");
      setEmailBody("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      {loading ? <Loader /> : <></>}
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        style={{
          "overflow-x": "scroll",
          "max-height": "800px",
          width: "800px",
        }}
      >
        <div className="flex flex-row items-center text-center">
          <div className="w-full">
            <h2 className="text-lg font-semibold">Send Email</h2>
          </div>
          <div
            onClick={() => setShowEmailModel(false)}
            className="my-auto font-normal border px-3 bg-gray-200 text-red-500 cursor-pointer hover:bg-red-400 hover:text-red-100 rounded"
          >
            x
          </div>
        </div>
        <div className="flex flex-row  mb-5">
          <div className="flex flex-col items-start w-full">
            <label htmlFor="template" className="font-bold p-1 text-base">
              Template
            </label>
            <select
              name="template"
              id="template"
              onChange={handleTemplateChange}
              className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
            >
              <option value="">Select Template</option>
              {templates.length > 0 &&
                templates.map((template, index) => (
                  <option value={index}>{template.template}</option>
                ))}
            </select>
          </div>
          <div className="flex flex-col items-start w-full">
            <label htmlFor="smtp" className="font-bold p-1 text-base">
              Email Protocol
            </label>
            <select
              className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
              value={selectedEmail}
              onChange={handleEmailChange}
              id="smtp"
            >
              <option value="">Select Email</option>
              <option value="admin">admin@gmail.com</option>
              <option value="custom">Custom Gmail With App password</option>
              <option value="aws">AWS SMTP</option>
              <option value="outlook">Outlook Graph Api</option>
              <option value="smtp_outlook">Outlook SMTP</option>
            </select>
          </div>
          <div className="flex flex-row items-end gap-4 w-full">
            <button
              onClick={() => setShowEmailModel(false)}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-normal font-mono text-base"
            >
              Cancel
            </button>
            <button
              onClick={handleSendEmail}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-normal font-mono text-base"
            >
              Send Email
            </button>
          </div>
        </div>

        {(selectedEmail === "custom" || selectedEmail === "smtp_outlook") && (
          <div className="flex flex-row  mb-5">
            <div className="flex flex-col items-start w-full">
              <label htmlFor="gmail" className="font-bold p-1 text-base">
                Gmail Id
              </label>
              <input
                type="email"
                id="gmail"
                className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
                placeholder={
                  selectedEmail === "custom"
                    ? "Enter Gmail"
                    : "Enter outlook email"
                }
                value={customEmail}
                onChange={(e) => setCustomEmail(e.target.value)}
                // className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col items-start w-full">
              <label htmlFor="password" className="font-bold p-1 text-base">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"} // Toggle between 'text' and 'password'
                placeholder={
                  selectedEmail === "custom"
                    ? "Enter Gmail SMTP Password"
                    : "Enter Outlook Smtp Password"
                }
                value={customPassword}
                onChange={(e) => setCustomPassword(e.target.value)}
                className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-3 flex items-center"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-600 mb-5" />
                ) : (
                  <FaEye className="text-gray-600 mb-5" />
                )}
              </button>
            </div>
          </div>
        )}
        <div className="flex flex-col items-start w-full">
          <label htmlFor="replyTo" className="font-bold p-1 text-base">
            Reply-To Email
          </label>
          <input
            type="text"
            id="replyTo"
            placeholder="Enter reply_to Email"
            value={replyToEmail}
            onChange={(e) => setReplyToEmail(e.target.value)}
            // className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            className="px-3  w-full mb-4 py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <label htmlFor="subject" className="font-bold p-1 text-base">
            Subject
          </label>
          <input
            type="text"
            placeholder="Email Subject"
            id="subject"
            value={emailSubject}
            onChange={(e) => setEmailSubject(e.target.value)}
            className="px-3  w-full mb-4 py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
          />
        </div>
        <div className="flex flex-col items-start w-full">
          <label htmlFor="message" className="font-bold p-1 text-base">
            Message
          </label>
          <textarea
            disabled
            placeholder="Enter Html Message Here"
            value={emailBody}
            id="message"
            onChange={(e) => setEmailBody(e.target.value)}
            className="px-3  w-full mb-4 py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
            rows="6"
          />
        </div>

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
              __html: emailBody ? emailBody : "Preview Will be Show Here",
            }}
          />
        </div>
        {selectedTemplate.attach_url !== null && (
          <div className="flex flex-col justify-start items-start">
            <label
              htmlFor="attachments"
              className="text-base font-bold p-1 mb-4"
            >
              Attachments
            </label>
            <div className="flex flex-row flex-wrap gap-9">
              {selectedTemplate.attach_url &&
                selectedTemplate.attach_url.length > 0 &&
                selectedTemplate.attach_url.map((url, index) => (
                  <a href={url} target="_blank" className="">
                    <div className="border py-3 px-4 bg-blue-200 hover:bg-slate-300 hover:text-white">
                      {index + 1}.{url.split(".").pop()}
                    </div>
                  </a>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailModel