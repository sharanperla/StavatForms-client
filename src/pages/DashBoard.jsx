import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SuccessPage from "./PurchaseSuccess";
import FormResponses from "./FormResponse";
import { useAuth } from "../context/AuthContext";
import { Copy } from "lucide-react";
import { Helmet } from "react-helmet-async";

function Dashboard() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState("available");
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied,setCopied]=useState("");
  const [viewingResponses, setViewingResponses] = useState(null);
  const [availableTemplates, setAvailableTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [purchasedTemplates, setPurchasedTemplates] = useState([]);
  const [loadingPurchased, setLoadingPurchased] = useState(false);
  const [errorPurchased, setErrorPurchased] = useState(null);
  const navigate = useNavigate();
  const {logout}=useAuth()
 
    const userId=localStorage.getItem('userId');
   
  console.log("userId=", userId);

  // Fetch available templates from the backend or API
  const fetchTemplates = async () => {
    setLoading(true);
    try {
      const cachedTemplates = localStorage.getItem("availableTemplates");
  
      if (cachedTemplates) {
        setAvailableTemplates(JSON.parse(cachedTemplates));
        setLoading(false);
        return;
      }
  
      const response = await fetch(
        "https://hacksocially.space/server/forms/get_forms.php"
      );
  
      if (!response.ok) {
        throw new Error("Failed to fetch templates");
      }
  
      const data = await response.json();
  
      if (data.success && data.forms) {
        setAvailableTemplates(data.forms);
        localStorage.setItem("availableTemplates", JSON.stringify(data.forms));
      } else {
        throw new Error(data.message || "No templates available");
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleSignOut = async () => {
    console.log("logging out");
    const token = localStorage.getItem("session_token");
    console.log(token);
    const response = await fetch(
      "https://hacksocially.space/server/auth/signout.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      }
    );

    const result = await response.json();
    console.log(result);
    if (result.success) {
      logout();
      navigate("/signin");
    } else {
      alert("Logout failed!");
    }
  };


  const handlePurchase = async (template) => {
    try {
      console.log(template);
  
      // Load AdSense script if not already loaded
      if (!window.adsbygoogle) {
        const script = document.createElement("script");
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
        script.async = true;
        document.body.appendChild(script);
        await new Promise((resolve) => script.onload = resolve); // Ensure script loads before using it
      }
  
      // Create a modal-like ad container
      const adContainer = document.createElement("div");
      adContainer.innerHTML = `
        <div id="rewarded-ad" style="position:fixed;top:0;left:0;width:100%;height:100%;background:#0008;display:flex;justify-content:center;align-items:center;">
          <ins class="adsbygoogle"
               style="display:block; width:90%; max-width:400px; height:300px;"
               data-ad-client="ca-pub-7833491170425770"
               data-ad-slot="2309846442"
               data-ad-format="auto"
               data-full-width-responsive="true"></ins>
        </div>
      `;
      document.body.appendChild(adContainer);
  
      // Ensure adsbygoogle is defined before pushing
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } else {
        console.warn("AdSense script failed to load.");
      }
  
      // Wait for ad to display (around 6 seconds)
      setTimeout(async () => {
        document.getElementById("rewarded-ad").remove(); // Remove ad after timeout
        
        const token = localStorage.getItem("session_token");
        if (!token) {
          alert("No session token found.");
          return;
        }
  
        const response = await fetch("https://hacksocially.space/server/forms/generate-link.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ template_id: template.id }),
        });
  
        const data = await response.json();
        if (data.success) {
          console.log(data);
          setGeneratedLink(data.link);
          setShowSuccessPage(true);
          fetchPurchasedTemplates(); // Reload purchased templates after purchase
        } else {
          alert("Purchase failed: " + data.error);
        }
      }, 6000); // Adjust timeout to match ad duration
    } catch (error) {
      console.error("Error purchasing template:", error);
      alert("An error occurred.");
    }
  };
  
  

  const handleViewResponses = async (template) => {
    await fetchPurchasedTemplates(true); // Force reload to ensure fresh responses
    setViewingResponses(template);
  };
  

  const fetchPurchasedTemplates = async (forceReload = false) => {
    setLoadingPurchased(true);
    const cachedPurchased = localStorage.getItem("purchasedTemplates");
  try {
    if (!forceReload && cachedPurchased) {
      setPurchasedTemplates(JSON.parse(cachedPurchased));
      setLoadingPurchased(false);
      return;
   
    }
      const token = localStorage.getItem("session_token");
  
      if (!token) {
        throw new Error("No session token found.");
      }
      const response = await fetch("https://hacksocially.space/server/forms/get_form_responses.php", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch purchased templates");
      }
      const data = await response.json();
      if (data.success && data.templates) {
        setPurchasedTemplates(data.templates);
        localStorage.setItem("purchasedTemplates", JSON.stringify(data.templates));
      } else {
        throw new Error(data.message || "No purchased templates available");
        
      }
    } catch (error) {
      console.error("Error fetching purchased templates:", error);
      setErrorPurchased(error.message);
    } finally {
      setLoadingPurchased(false);
    }
  };
  



  useEffect(() => {
    fetchTemplates();
    if (userId) {
      fetchPurchasedTemplates();
    }
  }, []);


  const handleCopy = (link, id) => {
    navigator.clipboard.writeText(link);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  if (showSuccessPage) {
    return (
      <SuccessPage
        link={generatedLink}
        onClose={() =>{ 
          setShowSuccessPage(false)
          localStorage.removeItem("purchasedTemplates");
          window.location.reload();
        }}
      />
    );
  }

  if (viewingResponses) {
    return (
      <FormResponses
        template={viewingResponses}
        onBack={() => setViewingResponses(null)}
      />
    );
  }

  return (
    <>
     <Helmet>
        <title>Dashboard | HackSocially</title>
        <meta name="Dashboard page" content="Welcome hacksocially.space" />
        <meta name="keywords" content="hacksocially , JobSim, Job Simulation, Social Media, Cyber Awareness, Cybersecurity, Phishing Attack, Online Safety, Digital Security, Data Protection" />
        <meta property="og:title" content="Dashboard | hacksocially" />
        <meta property="og:description" content="The best website for cyberawareness!" />
        <meta property="og:image" content="https://hacksocially.space/contact-form.png" />
      </Helmet>
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Stavat</span>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleSignOut}
                className="text-gray-600 hover:text-gray-900"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

          {/* Tabs */}
          <div className="mb-4">
            <nav className="flex space-x-4">
              <button
                className={`px-3 py-2 font-medium text-sm rounded-md ${
                  activeTab === "available"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("available")}
              >
                Available Templates
              </button>
              <button
                className={`px-3 py-2 font-medium text-sm rounded-md ${
                  activeTab === "purchased"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("purchased")}
              >
                Purchased Templates
              </button>
            </nav>
          </div>

          {/* Available Templates */}
          {activeTab === "available" && (
            <div>
              {loading ? (
                <p>Loading templates...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {availableTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer transition-transform hover:scale-105"
                      onClick={() => handleTemplateClick(template)}
                    >
                      <img
                        src={template.image || "/placeholder.svg"}
                        alt={template.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">
                          {template.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          {template.description}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-600 font-bold">
                            ${template.price}
                          </span>
                          <button
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePurchase(template);
                            }}
                          >
                            Purchase
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Purchased Templates */ console.log(purchasedTemplates)}
          {activeTab === "purchased" && (
            <div className="space-y-6">
              {loadingPurchased ? (
                <p>Loading purchased templates...</p>
              ) : errorPurchased ? (
                <p className="text-red-500">{errorPurchased}</p>
              ) : purchasedTemplates.length === 0 ? (
                <p>No purchased templates found.</p>
              ) : (
                purchasedTemplates.map((template) => (
                  <div
                    key={template.template_id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{template.form_name}</h3>
                      <p className="text-gray-600 mb-2 flex items-center">
                        <span className="truncate max-w-[70%] sm:max-w-full">Generated URL: </span>
                        <a
                          href={template.generated_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline truncate ml-2"
                        >
                          {template.generated_link}
                        </a>
                        <button
                          className="ml-2 p-1 text-gray-600 hover:text-black"
                          onClick={() => handleCopy(template.generated_link, template.template_id)}
                        >
                          <Copy size={18} />
                        </button>
                        {copied === template.template_id && (
                          <span className="ml-2 text-green-600 text-sm">Copied!</span>
                        )}
                      </p>
                      <button
                        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                        onClick={() => handleViewResponses(template)}
                      >
                        View Responses
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </main>

      {/* Template Details Modal */}
      {selectedTemplate && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
          onClick={() => setSelectedTemplate(null)}
        >
          <div
            className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {selectedTemplate.name}
              </h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  {selectedTemplate.description}
                </p>
                <p className="text-blue-600 font-bold mt-4">
                  ${selectedTemplate.price}
                </p>
              </div>
              <div className="items-center px-4 py-3">
                <button
                  className="px-4 py-2 bg-blue-600 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  onClick={() => handlePurchase(selectedTemplate)}
                >
                  Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default Dashboard;
