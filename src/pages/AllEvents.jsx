import React from "react";

const AllEvents = () => {
  const events = [
    {
      id: 1,
      title: "Indie Music Fest",
      price: 999,
      date: "2025-06-20",
      time: "18:00",
      image:
        "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=400",
    },
    {
      id: 2,
      title: "Tech Conference 2025",
      price: 1499,
      date: "2025-07-05",
      time: "10:00",
      image:
        "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=400",
    },
    {
      id: 3,
      title: "Indie Music Fest",
      price: 999,
      date: "2025-06-20",
      time: "18:00",
      image:
        "https://images.unsplash.com/photo-1503428593586-e225b39bddfe?w=400",
    },
  ];

  return (
    <div className="mx-auto my-8 text-gray-600 text-base px-6">
      <header className="mb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
          Browse <span className="text-red-500">All Events</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Explore upcoming and past events.
        </p>
      </header>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">{event.title}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {event.date} • {event.time}
              </p>
              <p className="text-lg font-semibold text-red-500 mt-2">
                ₹{event.price}
              </p>
              <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllEvents;
