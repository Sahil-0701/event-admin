import React from 'react'
import { MdOutlineDeleteOutline } from "react-icons/md";
const TableView = (props) => {
    const {events} = props
    console.log(events)
  return (
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-gray-700 text-md">
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Price (₹)</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Time</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-20 h-14 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">{event.title}</td>
                <td className="px-6 py-4">₹{event.price}</td>
                <td className="px-6 py-4">{event.date}</td>
                <td className="px-6 py-4">{event.time}</td>
                <td className="px-6 py-4"><MdOutlineDeleteOutline size={23}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  )
}

export default TableView