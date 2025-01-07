import { useEffect, useState } from "react";

export const WhatsAppCon = ({ selectedLeads, setSendWhatsApp }) => {
  const [message, setMessage] = useState([]);
  const [profile, setProfile] = useState([]);
  const [headerUrl, setHeaderUrl] = useState(null);
  const [templates, setTemplates] = useState([]);
  const [allTemplates, setAllTemplates] = useState([]);
  const [selectedWhatsApp, setSelectedWhatsapp] = useState("WS");
  const [loading, setLoading] = useState(false);

  const userLocalData = JSON.parse(localStorage.getItem("userData"));
  const accessToken = userLocalData ? userLocalData.access_token : null;

  useEffect(() => {
    fetchWhatsAppProfiles();
  }, []);

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const response = await fetch(
        "https://margda.in:7000/api/margda.org/templates/get-templates",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch templates");
      const data = await response.json();
      const filterTemplates = data.Templates.filter(
        (template) => template.temptype === "WS"
      );
      const filterAllTemplates = data.Templates.filter(
        (template) => template.temptype === "WS" || template.temptype === "WA"
      );
      setTemplates(filterTemplates);
      setAllTemplates(filterAllTemplates);
    } catch (error) {
      console.error("Error fetching templates:", error);
    }
  };

  const fetchWhatsAppProfiles = async () => {
    const response = await fetch(
      "https://margda.in:3000/api/margda/scan-whatsapp/getprofiles",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const body = await response.json();
    if (response.ok) {
      setProfile(body.Profiles);
    }
  };

  const sendMessage = async () => {
    setLoading(true);
    const userLocalData = JSON.parse(localStorage.getItem("userData"));
    const accessToken = userLocalData ? userLocalData.access_token : null;
    const mobile = userLocalData ? userLocalData.user_data.mobile : null;
    const whatsapp = userLocalData ? userLocalData.user_data.whatsapp : null;
    const name = userLocalData ? userLocalData.user_data.name : null;
    const email = userLocalData ? userLocalData.user_data.email : null;
    const formatMessage = message
      .replace("{whatsapp}", whatsapp)
      .replace("{email}", email)
      .replace("{euser}", name)
      .replace("{mobile}", mobile);
    const phoneNumbers = selectedLeads.map((lead) => lead.whatsapp);
    const recipientNames = selectedLeads.map((lead) => lead.name);
    try {
      const response = await fetch(
        "https://margda.in:3000/api/margda/scan-whatsapp/sendmessage",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            instanceId: profile[0].instance,
            phoneNumbers: phoneNumbers,
            message: formatMessage,
            headerUrl,
            recipientNames,
          }),
        }
      );
      const data = await response.json();
      setLoading(false);
      alert(JSON.stringify(data.message));
    } catch (e) {
      console.log(e);
      setLoading(false);
      alert("Error in sending message", e);
    }
  };

  const handleTemplateChange = (e) => {
    if (e.target.value !== "") {
      setMessage(templates[e.target.value].matter);
      if (templates[e.target.value].bimg_url) {
        setHeaderUrl(templates[e.target.value].bimg_url);
      } else {
        setHeaderUrl(null);
      }
    }
  };

  const handleWhatsappChange = async (e) => {
    setSelectedWhatsapp(e.target.value);
    if (e.target.value === "WS") {
      const filterTemplates = allTemplates.filter(
        (template) => template.temptype === "WS"
      );
      setTemplates(filterTemplates);
    } else {
      const filterTemplates = allTemplates.filter(
        (template) => template.temptype === "WA"
      );
      setTemplates(filterTemplates);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="bg-white p-6 rounded-lg shadow-lg"
        style={{
          overflowX: "scroll",
          height: "800px",
          width: "800px",
        }}
      >
        <div className="flex flex-row items-center text-center">
          <div className="w-full">
            <h2 className="text-lg font-semibold">Send Whatsapp</h2>
          </div>
          <div
            onClick={() => setSendWhatsApp(false)}
            className="my-auto font-normal border px-3 bg-gray-200 text-red-500 cursor-pointer hover:bg-red-400 hover:text-red-100 rounded"
          >
            x
          </div>
        </div>
        <div className="flex flex-row  mb-5">
          <div className="flex flex-col items-start w-full">
            <label htmlFor="type" className="font-bold p-1 text-base">
              Select Whatsapp
            </label>
            <select
              className="px-3  w-[90%] py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
              value={selectedWhatsApp}
              onChange={handleWhatsappChange}
              id="type"
            >
              <option value="WS">Scan Whatsapp</option>
              <option value="WA">Whatsapp Api</option>
            </select>
          </div>
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
          <div className="flex flex-row items-end gap-4 w-full">
            {selectedWhatsApp === "WS" && (
              <>
                {profile.length === 0 && (
                  <div className="bg-red-400 text-white p-2 rounded hover:bg-red-600 font-normal font-mono text-base">
                    scan whatsapp first
                  </div>
                )}
                {profile.length === 1 && !profile[0].active && (
                  <div className="bg-red-400 text-white p-2 rounded hover:bg-red-600 font-normal font-mono text-base">
                    re-scan whatsapp
                  </div>
                )}
                {profile.length === 1 && profile[0].active && (
                  <button
                    onClick={sendMessage}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-normal font-mono text-base"
                  >
                    Send
                  </button>
                )}
              </>
            )}
            {selectedWhatsApp === "WA" && (
              <div className="bg-red-400 text-white p-2 rounded hover:bg-red-600 font-normal font-mono text-base">
                not available
              </div>
            )}

            <button
              onClick={() => setSendWhatsApp(false)}
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 font-normal font-mono text-base"
            >
              Cancel
            </button>
          </div>
        </div>
        {headerUrl && (
          <div className="flex flex-col items-start w-full">
            <label htmlFor="header" className="font-bold p-1 text-base">
              Header Image
            </label>
            <div className="w-1/3 h-1/3">
              <img
                src={headerUrl}
                id="header"
                className="mb-4 border border-gray-400"
              />
            </div>
          </div>
        )}
        <div className="flex flex-col items-start w-full">
          <label htmlFor="message" className="font-bold p-1 text-base">
            Message
          </label>
          <textarea
            disabled
            value={message}
            id="message"
            onChange={(e) => setMessage(e.target.value)}
            className="px-3  w-full mb-4 py-2 border border-gray-400 rounded font-light focus:ring-blue-500 text-base focus:border-blue-500 "
            rows="13"
          />
        </div>
      </div>
    </div>
  );
};
