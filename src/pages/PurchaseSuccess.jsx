import React from "react";
import { Helmet } from "react-helmet-async";

function SuccessPage({ link, onClose }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied!");
  };

  return (
    <>
     <Helmet>
        <title>Success page | Hacksocially</title>
        <meta name="Success page" content="Welcome stavat forms" />
        <meta name="keywords" content="JobSim, Job Simulation, Social Media, Cyber Awareness, Cybersecurity, Phishing Attack, Online Safety, Digital Security, Data Protection " />
        <meta property="og:title" content="Success | Hacksocially" />
        <meta property="og:description" content="The best website for cyber awarness!" />
        <meta property="og:image" content="/contact-form.png" />
      </Helmet>
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold text-green-600">Purchase Successful!</h2>
        <p className="mt-2 text-gray-700">Share your form link:</p>
        <input
          type="text"
          value={link}
          readOnly
          className="border mt-2 p-2 w-full text-center"
        />
        <button
          onClick={handleCopy}
          className="bg-blue-600 text-white mt-2 px-4 py-2 rounded hover:bg-blue-700"
        >
          Copy Link
        </button>
        <button onClick={onClose} className="mt-4 text-gray-500 hover:underline">
          Close
        </button>
      </div>
    </div>
    </>
  );
}

export default SuccessPage;
