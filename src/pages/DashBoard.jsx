import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SuccessPage from './PurchaseSuccess';
import FormResponses from './FormResponse';
import { useAuth } from '../context/AuthContext';

// Mock data for purchased templates (unchanged)
const purchasedTemplates = [
  { 
    id: 1, 
    name: 'Simple Contact Form', 
    url: 'https://stavat.com/form/abc123',
    results: [
      { name: 'John Doe', email: 'john@example.com', message: 'Great product!' },
      { name: 'Jane Smith', email: 'jane@example.com', message: 'I have a question about...' },
    ]
  },
  { 
    id: 3, 
    name: 'Feedback Form', 
    url: 'https://stavat.com/form/def456',
    results: [
      { name: 'Alice Johnson', email: 'alice@example.com', rating: 5, feedback: 'Excellent service!' },
      { name: 'Bob Williams', email: 'bob@example.com', rating: 4, feedback: 'Good, but could improve...' },
    ]
  },
];

function Dashboard() {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [activeTab, setActiveTab] = useState('available');
  const [showSuccessPage, setShowSuccessPage] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [viewingResponses, setViewingResponses] = useState(null);
  const [availableTemplates, setAvailableTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {userId}=useAuth();
console.log('userId=',userId);
  useEffect(() => {
    // Fetch available templates from the backend or API
    const fetchTemplates = async () => {
      try {
        const response = await fetch('https://khaki-mouse-381632.hostingersite.com/server/forms/get_forms.php'); 
        const data = await response.json();
        console.log(data.success);
        if (data) {
          setAvailableTemplates(data.forms);
        } else {
          throw new Error('Failed to fetch templates');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
  };

  const handleSignOut = async () => {
    console.log('logging out');
    const token = localStorage.getItem("session_token");
    console.log(token);
    const response = await fetch("https://khaki-mouse-381632.hostingersite.com/server/auth/signout.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });

    const result = await response.json();
    console.log(result);
    if (result.success) {
      localStorage.removeItem("session_token");
      navigate("/signin");
    } else {
      alert("Logout failed!");
    }
  };

  const handlePurchase = async (template) => {
    console.log(template);
    try {
      const token = localStorage.getItem("session_token");
   console.log(token);
    if (!token) {
      alert("No session token found.");
      return;
    }

      const response = await fetch("https://khaki-mouse-381632.hostingersite.com/server/forms/generate-link.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ template_id: template.id })
      });
  
      const data = await response.json();
      console.log(data,'data');
      if (data.success) {
        setGeneratedLink(data.link);
        setShowSuccessPage(true);
      } else {
        alert("Purchase failed: " + data.error);
      }
    } catch (error) {
      console.error("Error purchasing template:", error);
      alert("An error occurred.");
    }
  };
  

  const handleViewResponses = (template) => {
    setViewingResponses(template);
  };

  if (showSuccessPage) {
    return <SuccessPage link={generatedLink} onClose={() => setShowSuccessPage(false)} />;
  }

  if (viewingResponses) {
    return <FormResponses template={viewingResponses} onBack={() => setViewingResponses(null)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Stavat</span>
            </div>
            <div className="flex items-center">
              <button onClick={handleSignOut} className="text-gray-600 hover:text-gray-900">
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
                  activeTab === 'available'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('available')}
              >
                Available Templates
              </button>
              <button
                className={`px-3 py-2 font-medium text-sm rounded-md ${
                  activeTab === 'purchased'
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('purchased')}
              >
                Purchased Templates
              </button>
            </nav>
          </div>

          {/* Available Templates */}
          {activeTab === 'available' && (
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
                      <img src={template.image || "/placeholder.svg"} alt={template.name} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                        <p className="text-gray-600 mb-4">{template.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-blue-600 font-bold">${template.price}</span>
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

          {/* Purchased Templates */}
          {activeTab === 'purchased' && (
            <div className="space-y-6">
              {purchasedTemplates.map((template) => (
                <div key={template.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{template.name}</h3>
                    <p className="text-gray-600 mb-2">Generated URL: <a href={template.url} className="text-blue-600 hover:underline">{template.url}</a></p>
                    <button 
                      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
                      onClick={() => handleViewResponses(template)}
                    >
                      View Responses
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Template Details Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" onClick={() => setSelectedTemplate(null)}>
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white" onClick={e => e.stopPropagation()}>
            <div className="mt-3 text-center">
              <h3 className="text-lg leading-6 font-medium text-gray-900">{selectedTemplate.name}</h3>
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
  );
}

export default Dashboard;
