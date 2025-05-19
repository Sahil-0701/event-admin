import React, { useState, memo } from "react";
import { formatEventDateTime } from "../utils/formatEventDateTime";
import { deleteEvent } from "../api/apiService";
import { MdEdit, MdDelete } from "react-icons/md";
import EditEventModal from "./EditEventModal";

const EventCard = memo(({ event, onDelete, onUpdate }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const {
    _id,
    eventTitle,
    eventDescription,
    eventDate,
    startTime,
    endTime,
    organizer,
    totalSeats,
    ticketPrice,
    eventType,
    eventImages = [],
  } = event;

  const handleEdit = () => setIsEditModalOpen(true);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    setIsDeleting(true);
    setError("");
    try {
      await onDelete(_id);
    } catch (err) {
      setError(err.message || "Failed to delete event.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdate = (updatedEvent) => onUpdate(updatedEvent);

  const handleDismissError = () => setError("");

  return (
    <>
      <article
        className="mx-auto bg-white rounded-2xl border border-gray-300 shadow-sm transition-shadow duration-300 overflow-hidden flex flex-col md:flex-row"
        aria-label={`Event: ${eventTitle}`}
      >
        {/* Left: Image */}
        <section className="md:w-1/4 aspect-[4/3] md:aspect-auto h-48 md:h-auto flex-shrink-0 rounded-l-2xl overflow-hidden bg-gray-100">
          <img
            src={eventImages[0] || "/placeholder.jpg"}
            alt={eventTitle || "Event Image"}
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
        </section>

        {/* Right: Content + Actions */}
        <section className="flex-1 px-4 py-3 flex flex-col justify-between space-y-2 md:space-y-1">
          <header className="flex justify-between items-start gap-3">
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-gray-900 tracking-tight truncate py-2">
                {eventTitle.toUpperCase()}
              </h2>
              <p className="mt-0.5 text-gray-700 text-sm leading-snug line-clamp-5">
                {eventDescription}
              </p>
              <div className="mt-2 text-xs text-gray-500 space-y-0.5">
                <time
                  dateTime={`${eventDate}T${startTime}`}
                  className="block font-medium text-gray-600"
                >
                  {formatEventDateTime(eventDate, startTime, endTime)}
                </time>
                <p className="font-semibold text-black py-2">
                  Organized by:{" "}
                  <span className="text-gray-800 font-semibold">
                    {organizer}
                  </span>
                </p>
              </div>
            </div>

            {/* Edit & Delete Buttons */}
            <div className="flex flex-col gap-1 shrink-0">
              <button
                onClick={handleEdit}
                aria-label={`Edit event ${eventTitle}`}
                className="p-1.5 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                title="Edit Event"
                type="button"
              >
                <MdEdit className="text-blue-600 text-xl" />
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                aria-label={`Delete event ${eventTitle}`}
                className="p-1.5 rounded-full hover:bg-red-100 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-red-500 transition cursor-pointer"
                title="Delete Event"
                type="button"
              >
                {isDeleting ? (
                  <svg
                    className="animate-spin h-5 w-5 text-red-600 mx-auto"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                ) : (
                  <MdDelete className="text-red-600 text-xl" />
                )}
              </button>
            </div>
          </header>

          {/* Tags & Pricing */}
          <div className="flex items-center gap-2 text-xs md:text-sm">
            <span className="bg-gradient-to-r from-blue-200 to-blue-300 text-blue-800 px-2 py-0.5 font-semibold rounded-full uppercase shadow-sm select-none">
              {eventType}
            </span>
            <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full font-medium select-none">
              {totalSeats} Seats
            </span>
            <span className="ml-auto text-base font-extrabold text-red-600 tracking-wide select-none">
              ₹{ticketPrice}
            </span>
          </div>
        </section>
      </article>

      {/* Error Message */}
      {error && (
        <div
          role="alert"
          className="mt-4 max-w-5xl mx-auto text-sm bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg flex justify-between items-center shadow-sm"
        >
          <span>{error}</span>
          <button
            onClick={handleDismissError}
            aria-label="Dismiss error message"
            className="ml-4 text-red-700 hover:text-red-900 focus:outline-none"
            type="button"
          >
            &#x2715;
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditEventModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          event={event}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
});

export default EventCard;
