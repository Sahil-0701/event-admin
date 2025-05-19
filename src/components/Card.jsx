import React from "react";
import { formatEventDateTime } from "../utils/formatEventDateTime";

const StatCard = ({ title, value, icon, footer }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 min-h-[140px]">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm sm:text-base font-medium text-gray-600">{title}</h3>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mt-2">{value}</p>
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
      {footer && (
        <p className="text-xs sm:text-sm text-gray-500 mt-4">{footer}</p>
      )}
    </div>
  );
};

export default StatCard;
