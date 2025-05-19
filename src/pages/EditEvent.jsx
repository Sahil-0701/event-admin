import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateEvent } from "../api/apiService";
import { toast } from "react-toastify";

const EditEvent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};

  const [images, setImages] = useState([null, null, null, null]);
  const [eventTitle, setEventTitle] = useState(event?.eventTitle || "");
  const [eventDescription, setEventDescription] = useState(
    event?.eventDescription || ""
  );
  const [eventDate, setEventDate] = useState(
    event?.eventDate?.split("T")[0] || ""
  );
  const [startTime, setStartTime] = useState(event?.startTime || "");
  const [endTime, setEndTime] = useState(event?.endTime || "");
  const [venue, setVenue] = useState(event?.venue || "");
  const [organizer, setOrganizer] = useState(event?.organizer || "");
  const [totalSeats, setTotalSeats] = useState(event?.totalSeats || "");
  const [ticketPrice, setTicketPrice] = useState(event?.ticketPrice || "");
  const [eventType, setEventType] = useState(event?.eventType || "");
  const [isFeatured, setIsFeatured] = useState(event?.isFeatured || false);
  const [previewUrls, setPreviewUrls] = useState(
    event?.eventImages || [null, null, null, null]
  );

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const updatedImages = [...images];
      const updatedPreviews = [...previewUrls];

      updatedImages[index] = file;
      updatedPreviews[index] = URL.createObjectURL(file);

      setImages(updatedImages);
      setPreviewUrls(updatedPreviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      eventId: event._id,
      eventTitle,
      eventDescription,
      eventDate,
      startTime,
      endTime,
      venue,
      organizer,
      totalSeats,
      ticketPrice,
      eventType,
      isFeatured,
    };
    try {
      await updateEvent(data);
      toast.success("Event updated successfully!");
      navigate("/all-events");
    } catch (error) {
      console.error(
        "Event update error:",
        error.response?.data || error.message
      );
      toast.error("Event update failed!");
    }
  };

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <div className="flex flex-col items-start overflow-hidden px-6 py-4">
      <form
        className="bg-white text-black rounded-lg shadow p-8 w-full space-y-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
          Edit <span className="text-red-500">Event</span>
        </h1>

        {/* Upload Images */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Event Images
          </label>
          <div className="flex gap-4">
            {previewUrls.map((preview, idx) => (
              <div key={idx} className="relative w-20 h-20">
                {preview ? (
                  <img
                    src={preview}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover rounded border"
                  />
                ) : (
                  <label
                    htmlFor={`eventImage_${idx}`}
                    className="cursor-pointer w-full h-full bg-gray-200 flex justify-center items-center"
                  >
                    <img
                      src="./download.png"
                      className="hover:opacity-75"
                      alt="Upload"
                    />
                  </label>
                )}
                <input
                  id={`eventImage_${idx}`}
                  type="file"
                  onChange={(e) => handleImageChange(e, idx)}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Event Name */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Event Title
          </label>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="e.g. Indie Music Fest 2025"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Event Description */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Event Description
          </label>
          <textarea
            rows="4"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="Give a short description of the event..."
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        {/* Event Date & Time */}
        <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-6">
          <div className="w-full sm:flex-1">
            <label className="block mb-2 font-semibold text-gray-700">
              Event Date
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="w-full sm:flex-1">
            <label className="block mb-2 font-semibold text-gray-700">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="w-full sm:flex-1">
            <label className="block mb-2 font-semibold text-gray-700">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Venue & Organizer */}
        <div className="flex gap-6">
          <div className="flex-1">
            <label className="block mb-2 font-semibold text-gray-700">
              Venue
            </label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. Siri Fort Auditorium, Delhi"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 font-semibold text-gray-700">
              Organizer Name
            </label>
            <input
              type="text"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              placeholder="e.g. Rudra Events Pvt Ltd"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Ticket Info */}
        <div className="flex gap-6">
          <div className="flex-1">
            <label className="block mb-2 font-semibold text-gray-700">
              Total Seats
            </label>
            <input
              type="number"
              value={totalSeats}
              onChange={(e) => setTotalSeats(e.target.value)}
              placeholder="e.g. 500"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 font-semibold text-gray-700">
              Ticket Price (₹)
            </label>
            <input
              type="number"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
              placeholder="e.g. 999"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 font-semibold text-gray-700">
              Event Type
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Type</option>
              <option value="concert">Concert</option>
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="meetup">Meetup</option>
            </select>
          </div>
        </div>

        {/* Feature Event */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featureEvent"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          <label htmlFor="featureEvent" className="font-medium text-gray-800">
            Feature this Event
          </label>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Update Event
          </button>
          <button
            type="button"
            onClick={() => navigate("/all-events")}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEvent;
