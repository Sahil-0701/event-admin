import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { useState, useContext } from "react";
import { registerAdmin } from "../api/apiService";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [organizationName, setOrganizationName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (password !== confirmPassword) {
    toast.error("Passwords do not match", { autoClose: 5000 });
    return;
  }

  try {
    const response = await registerAdmin({
      organizationName,
      name,
      email,
      password,
    });

    const { token, admin } = response.data;
    if (token) {
      login(token);
      sessionStorage.setItem("admin", JSON.stringify(admin));
      toast.success("Registration successful!", { autoClose: 3000 });
      navigate("/");
    }
  } catch (error) {
    console.error(
      "Registration error:",
      error.response?.data || error.message
    );
    
    const errorMessage = error.response?.data?.message || "Registration failed";
    toast.error(errorMessage, { autoClose: 5000 });
  }
};
  return (
    <div className=" flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xl px-8 py-10 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-2">
          Admin Panel
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Join the community today!
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Organization Name
            </label>
            <input
              type="text"
              value={organizationName}
              onChange={(e) => {
                setOrganizationName(e.target.value);
              }}
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-md transition duration-300"
          >
            Sign Up 💖
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-indigo-600 hover:text-indigo-700 font-semibold transition"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
