
import { Link } from "react-router-dom";
import "../index.css";

const Signup = () => {
  return (
    <div className=" flex justify-center items-center min-h-screen">
      <div className="w-full max-w-xl px-8 py-10 bg-white rounded-2xl shadow-2xl border border-gray-100">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-2">
         Admin Panel

        </h2>
        <p className="text-center text-gray-500 mb-8">
          Join the community today!
        </p>

        <form className="space-y-6">
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
             Organization Name
            </label>
            <input
              type="text"
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
