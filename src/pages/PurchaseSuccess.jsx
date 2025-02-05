import React from "react";

function SuccessPage({ link, onClose }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied!");
  };

  return (
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
  );
}

export default SuccessPage;
