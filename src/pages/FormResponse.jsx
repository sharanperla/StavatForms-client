function FormResponses({ template, onBack }) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Responses for {template.name}</h1>
              <button
                onClick={onBack}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {template.results.map((result, index) => (
                  <li key={index} className="p-4">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{result.name}</p>
                        <p className="text-sm text-gray-500">{result.email}</p>
                      </div>
                      {result.rating && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Rating: {result.rating}/5
                        </span>
                      )}
                    </div>
                    {result.message && <p className="mt-2 text-sm text-gray-600">{result.message}</p>}
                    {result.feedback && <p className="mt-2 text-sm text-gray-600">{result.feedback}</p>}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default FormResponses
  
  