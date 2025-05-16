import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Boxes, PlusCircle, Package } from "lucide-react";
import { FaTeamspeak } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
      isActive
        ? "bg-gray-700 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  return (
    <aside className="w-64 md:flex hidden bg-gray-900 text-white sticky top-[10vh] h-[calc(100vh-10vh)] p-6 overflow-y-auto shadow-lg flex-col justify-between">
      {/* Top: Admin Panel heading */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-center tracking-wide">
          ADMIN PANEL
        </h2>

        {/* Navigation links */}
        <nav className="flex flex-col gap-2">
          <NavLink to="/" className={navLinkClasses}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/add-events" className={navLinkClasses}>
            <PlusCircle size={20} />
            Create Event
          </NavLink>
          <NavLink to="/all-events" className={navLinkClasses}>
            <Boxes size={20} />
            All Events
          </NavLink>
          <NavLink to="/orders" className={navLinkClasses}>
            <Package size={20} />
            Orders
          </NavLink>
        </nav>
      </div>

      {/* Bottom: Footer */}
      <div className="pt-6 border-t border-gray-700 text-xs font-bold text-center tracking-wide">
        © 2025 Events Pvt Ltd
      </div>
    </aside>
  );
};

export default Sidebar;
