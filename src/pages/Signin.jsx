
import { Link } from 'react-router-dom';
import "../index.css";

const Signin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center  px-4 py-12">
      <div className="w-full max-w-xl bg-white p-8 sm:p-10 rounded-2xl shadow-2xl border border-gray-100">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-2">
          Welcome Back 
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Log in to your account
        </p>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-100 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition duration-200 ease-in-out"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-md transition duration-300"
          >
            Sign In 🚀
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{' '}
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
