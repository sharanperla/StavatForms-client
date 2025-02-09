import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

function FormPage() {
  const location = useLocation();
  const [userId, setUserId] = useState(null);
  const [formId, setFormId] = useState(null);
  const [formTemplate, setFormTemplate] = useState(null);
  const [error, setError] = useState('');
  const [additionalFields, setAdditionalFields] = useState({});

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const template_id = params.get('template_id');
    const user_id = params.get('user_id');

    if (!template_id || !user_id) {
      setError('Invalid link: Missing template ID or user ID.');
      return;
    }

    setFormId(template_id);
    setUserId(user_id);

    const fetchForm = async () => {
      try {
        const response = await fetch(
          `https://hacksocially.space/server/forms/get_form.php?template_id=${template_id}&user_id=${user_id}`
        );

        const data = await response.json();

        if (data.success) {
          setFormTemplate(data.form);
        } else {
          setError('Unauthorized access or form not found.');
        }
      } catch (err) {
        setError('An error occurred while fetching form details.');
      }
    };

    fetchForm();
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId || !formId) {
      alert('Invalid form submission.');
      return;
    }

    const formData = {
      ...additionalFields
    };

    const res = await fetch("https://hacksocially.space/server/forms/submit_response.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        template_id: formId,
        user_id: userId,
        response: formData
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Response submitted successfully!");
    } else {
      alert("Submission failed: " + data.error);
    }
  };

  const handleAdditionalFieldChange = (e) => {
    const { name, value } = e.target;
    setAdditionalFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!formTemplate) {
    return <p>Loading form...</p>;
  }
  return (
    <>
      <Helmet>
        <title>Form | HackSocially</title>
        <meta name="form page" content="Welcome hacksocially.space" />
        <meta name="keywords" content="hacksocially , JobSim, Job Simulation, Social Media, Cyber Awareness, Cybersecurity, Phishing Attack, Online Safety, Digital Security, Data Protection" />
        <meta property="og:title" content="form | hacksocially" />
        <meta property="og:description" content="The best website for cyberawareness!" />
        <meta property="og:image" content="https://hacksocially.space/contact-form.png" />
      </Helmet>
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">{formTemplate.name}</h2>
      <p className="text-gray-600 mb-4">{formTemplate.description}</p>
      <img src={formTemplate.image} alt={formTemplate.name} className="w-full rounded-lg mb-4" />

      {formId === "1" && (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" name="fullName" onChange={handleAdditionalFieldChange} className="w-full p-2 border rounded mb-2" />
          <input type="email" placeholder="Email Address" name="email" onChange={handleAdditionalFieldChange} className="w-full p-2 border rounded mb-2" />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Submit</button>
        </form>
      )}

      {formId === "2" && (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Company Name" name="companyName" onChange={handleAdditionalFieldChange} className="w-full p-2 border rounded mb-2" />
          <input type="text" placeholder="Role" name="role" onChange={handleAdditionalFieldChange} className="w-full p-2 border rounded mb-2" />
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Submit</button>
        </form>
      )}

      {formId === "3" && (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Feedback" name="feedback" onChange={handleAdditionalFieldChange} className="w-full p-2 border rounded mb-2" />
          <select name="rating" onChange={handleAdditionalFieldChange} className="w-full p-2 border rounded mb-2">
            <option value="">Rate Us</option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
          <button type="submit" className="w-full bg-yellow-600 text-white p-2 rounded">Submit</button>
        </form>
      )}

      {formId === "4" && (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Order ID" name="orderId" onChange={handleAdditionalFieldChange} className="w-full p-2 border rounded mb-2" />
          <input type="text" placeholder="Issue" name="issue" onChange={handleAdditionalFieldChange} className="w-full p-2 border rounded mb-2" />
          <button type="submit" className="w-full bg-red-600 text-white p-2 rounded">Submit</button>
        </form>
      )}

      {formId === "5" && (
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Event Name" name="eventName" onChange={handleAdditionalFieldChange} className="w-full p-2 border rounded mb-2" />
          <input type="date" name="eventDate" onChange={handleAdditionalFieldChange} className="w-full p-2 border rounded mb-2" />
          <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded">Submit</button>
        </form>
      )}
    </div>
    </>
  );
}

export default FormPage;
