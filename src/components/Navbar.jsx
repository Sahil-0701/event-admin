import React, { useState } from "react";
import { FaOpencart } from "react-icons/fa";
import { MdPersonOutline } from "react-icons/md";
import { PiMagnifyingGlass } from "react-icons/pi";
import { RiMenu3Line } from "react-icons/ri";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="text-gray-800 py-6 px-6 flex justify-between items-center relative shadow ">
      <div className="text-xl md:text-3xl font-extrabold">
        <Link to="/" className="text-gray-500 hover:text-blue-500">
          True
          <span className="text-gray-700 hover:text-blue-500">Events</span>
        </Link>
      </div>

      {/* Desktop Icons */}
      <div className="hidden sm:flex space-x-6 text-2xl ">
        <div className="relative group">
          {/* Icon with badge */}
          <div className="cursor-pointer">
            <MdPersonOutline className="text-gray-800 hover:text-blue-500 " />
          </div>

          {/* Dropdown Menu */}
          <div className="absolute text-lg right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition duration-300 ease-in-out z-50">
            <Link
              to="/signin"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Icons + Hamburger */}
      <div className="sm:hidden flex items-center space-x-4 text-2xl">
        <RiMenu3Line className="cursor-pointer" onClick={toggleMenu} />
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden absolute top-20 left-0 right-0 bg-white shadow-lg z-10">
          <ul className="text-center py-4 space-y-4 text-xl">
            <li>
              <Link
                to="/"
                className="text-gray-800 hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/add-events"
                className="text-gray-800 hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Create Event
              </Link>
            </li>
            <li>
              <Link
                to="/all-events"
                className="text-gray-800 hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                All Events
              </Link>
            </li>
            <li>
              <Link
                to="/orders"
                className="text-gray-800 hover:text-blue-500"
                onClick={() => setIsOpen(false)}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/signup"
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                Signup
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
