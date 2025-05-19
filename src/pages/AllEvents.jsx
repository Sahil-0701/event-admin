import React, { useEffect, useState } from "react";
import { deleteEvent, getAllEvents } from "../api/apiService";
import EventCard from "../components/EventCard";
import { toast } from "react-toastify";


const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

   const fetchEvents = async () => {
    try {
      setIsLoading(true);
      const response = await getAllEvents();
      setEvents(response.data.events);
    } catch (error) {
      console.error("Failed to fetch events:", error);
      toast.error("Failed to fetch events. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
 const handleDelete = async (eventId) => {
  try {
    await deleteEvent(eventId);
    await fetchEvents();       
    toast.success("Event deleted successfully!");
  } catch (error) {
    console.error("Error handling delete:", error);
    toast.error("Failed to delete event. Please try again.");
    await fetchEvents();       
  }
};
  const handleUpdate = (updatedEvent) => {
    setEvents(
      events.map((event) =>
        event._id === updatedEvent._id ? updatedEvent : event
      )
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
   <div className="space-y-6 my-5 md:my-8 lg:my-10">

      <header className="mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
          Browse <span className="text-red-500">All Events</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          Explore upcoming and past events.
        </p>
      </header>

      <div className="space-y-6">
        {events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No events found.</p>
          </div>
        ) : (
          events.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllEvents;
