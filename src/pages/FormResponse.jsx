function FormResponses({ template, onBack }) {
  console.log('tempt',template);
  return (
    <div className="min-h-screen bg-gray-100" id={`template-${template.template_id}`}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Responses for {template.form_name}</h1>
            <button
              onClick={onBack}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {template.responses && template.responses.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {template.responses.map((response, index) => (
                  <li key={index} className="p-4 border-b">
                    <div className="flex flex-col space-y-2">
                      {Object.entries(response).map(([key, value]) => (
                        <p key={key} className="text-sm text-gray-700">
                          <span className="font-medium text-gray-900 capitalize">
                            {key.replace(/_/g, " ")}:
                          </span>{" "}
                          {typeof value === "object" ? (
                            <pre className="bg-gray-50 p-2 rounded text-sm">{JSON.stringify(value, null, 2)}</pre>
                          ) : (
                            value
                          )}
                        </p>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-6 text-gray-500 text-center">No responses available for this template.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormResponses;
