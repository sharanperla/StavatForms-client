import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import authentication context

function SignIn() {
  const { login } = useAuth(); // Use login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (validateForm()) {
      try {
        const response = await fetch(
          "https://khaki-mouse-381632.hostingersite.com/server/auth/signin.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        const data = await response.json();
        if (data.success) {
          login(data.token); // Save token and update auth state
          navigate("/dashboard");
        } else {
          setServerError(data.message || "Invalid credentials");
        }
      } catch (error) {
        console.error("Error:", error);
        setServerError("An unexpected error occurred. Please try again later.");
      }
    }
  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white bg-opacity-10 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-medium mb-6 text-center text-black">Sign In</h1>
        {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-white bg-opacity-20 rounded text-black placeholder-gray-300"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-white bg-opacity-20 rounded text-black placeholder-gray-300"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
          
            className="w-full bg-blue-500 text-white py-2 rounded font-bold hover:bg-opacity-90 transition duration-300"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-black">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-400 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
