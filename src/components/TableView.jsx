import React from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";

const TableView = ({ events }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-50 text-left text-gray-700 text-sm sm:text-base">
            <th className="px-4 sm:px-6 py-3">Image</th>
            <th className="px-4 sm:px-6 py-3">Title</th>
            <th className="px-4 sm:px-6 py-3">Price (₹)</th>
            <th className="hidden sm:table-cell px-4 sm:px-6 py-3">Date</th>
            <th className="hidden sm:table-cell px-4 sm:px-6 py-3">Start Time</th>
            <th className="hidden sm:table-cell px-4 sm:px-6 py-3">End Time</th>
            <th className="px-4 sm:px-6 py-3 sm:hidden">Date & Time</th>
            <th className="px-4 sm:px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {events.map((event) => (
            <tr key={event.id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 sm:px-6 py-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-16 h-12 sm:w-20 sm:h-14 object-cover rounded"
                />
              </td>
              <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">{event.title}</td>
              <td className="px-4 sm:px-6 py-4 text-sm sm:text-base">₹{event.price}</td>
              <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm sm:text-base">{event.date}</td>
              <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm sm:text-base">{event.startTime}</td>
              <td className="hidden sm:table-cell px-4 sm:px-6 py-4 text-sm sm:text-base">{event.endTime}</td>
              <td className="px-4 sm:px-6 py-4 text-sm sm:text-base sm:hidden">
                <div className="space-y-1">
                  <div>{event.date}</div>
                  <div className="text-gray-500 text-xs">
                    {event.startTime} - {event.endTime}
                  </div>
                </div>
              </td>
              <td className="px-4 sm:px-6 py-4">
                <button className="text-gray-500 hover:text-red-500 transition-colors">
                  <MdOutlineDeleteOutline size={20} className="sm:w-6 sm:h-6" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableView