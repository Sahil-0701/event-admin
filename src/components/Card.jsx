import React from 'react';

const Card = ({ title, value, icon, footer }) => {
  return (
    <div className="bg-white border rounded-2xl shadow-md p-4 flex flex-col justify-between min-w-[200px]">
      <div className="flex items-center justify-between">
        <h4 className="text-sm text-gray-600">{title}</h4>
        {icon && <div className="text-xl">{icon}</div>}
      </div>
      <div className="mt-2 text-2xl font-semibold text-gray-900">{value}</div>
      {footer && <div className="mt-2 text-sm text-gray-400">{footer}</div>}
    </div>
  );
};

export default Card;
