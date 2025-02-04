function SuccessPage({ link, onClose }) {
    const copyToClipboard = () => {
      navigator.clipboard.writeText(link).then(() => {
        alert("Link copied to clipboard!")
      })
    }
  
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-2xl font-bold text-green-600 mb-4">Purchase Successful!</h2>
          <p className="text-gray-600 mb-4">Your form has been created successfully. Here's your unique link:</p>
          <div className="bg-gray-100 p-4 rounded-md mb-4">
            <p className="text-blue-600 break-all">{link}</p>
          </div>
          <div className="flex justify-between">
            <button
              onClick={copyToClipboard}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Copy Link
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  export default SuccessPage
  
  