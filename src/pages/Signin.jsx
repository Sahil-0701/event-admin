import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { loginAdmin, setAuthToken } from "../api/apiService";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginAdmin({ email, password });
      const { token } = response.data;

      if (token) {
        login(token);
        localStorage.setItem("admin", JSON.stringify(response?.data?.admin));
        toast.success("Login successful!", { autoClose: 3000 });
        setTimeout(() => navigate("/"), 10000);
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error("Login failed. Please check your credentials.", {
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-12">
      <div className="w-full max-w-xl bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-100">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-8">Log in to your account</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
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
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-md transition duration-300"
          >
            Sign In 
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:text-indigo-700 font-semibold transition"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
