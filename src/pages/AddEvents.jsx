import React, { useState, useEffect } from "react";
import { createEvent } from "../api/apiService";
import { setAuthToken } from "../api/apiService";
import { toast } from "react-toastify";

const AddEvents = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
    } else {
      window.location.href = "/signin";
    }
  }, []);

  const [images, setImages] = useState([null, null, null, null]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [venue, setVenue] = useState("");
  const [totalSeats, setTotalSeats] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [eventType, setEventType] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [organizer, setOrganizer] = useState("");

  const [previewUrls, setPreviewUrls] = useState([null, null, null, null]);

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
    setLoading(true);

    const formData = new FormData();
    formData.append("eventTitle", eventTitle);
    formData.append("eventDescription", eventDescription);
    formData.append("eventDate", eventDate);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    formData.append("venue", venue);
    formData.append("organizer", organizer);

    formData.append("totalSeats", totalSeats);
    formData.append("ticketPrice", ticketPrice);
    formData.append("eventType", eventType);
    formData.append("isFeatured", isFeatured);
    images.forEach((image) => {
      if (image) {
        formData.append("images", image);
      }
    });

    try {
      const res = await createEvent(formData);
      setEventTitle("");
      setEventDescription("");
      setEventDate("");
      setStartTime("");
      setEndTime("");
      setVenue("");
      setTotalSeats("");
      setTicketPrice("");
      setEventType("");
      setIsFeatured(false);
      setImages([null, null, null, null]);
      setPreviewUrls([null, null, null, null]);
      setOrganizer("");
      toast.success("Event created successfully!", { autoClose: 3000 });
    } catch (error) {
      toast.error(
        "Event creation failed! " +
          (error.response?.data?.message || error.message),
        { autoClose: 5000 }
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [previewUrls]);

  return (
    <div className="flex flex-col items-start overflow-hidden px-2 py-4 sm:px-10 sm:py-8 bg-gray-50 min-h-screen">
      <form
        className="bg-white text-gray-900 rounded-lg  w-full  space-y-8"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
          Create <span className="text-red-600">Exciting New Events</span>
        </h1>

        {/* Upload Images */}
        <div>
          <label className="block mb-3 font-semibold text-gray-700">
            Upload Event Images
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2 px-1">
            {images.map((image, idx) => (
              <div
                key={idx}
                className="relative w-full h-24 rounded-lg border border-gray-300 overflow-hidden bg-gray-100 flex justify-center items-center"
              >
                {previewUrls[idx] ? (
                  <img
                    src={previewUrls[idx]}
                    alt={`Preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <label
                    htmlFor={`eventImage_${idx}`}
                    className="cursor-pointer w-full h-full flex flex-col justify-center items-center text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 mb-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 15a4 4 0 014-4h10a4 4 0 110 8H7a4 4 0 01-4-4z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 11V7a4 4 0 10-8 0v4"
                      />
                    </svg>
                    Upload
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

        {/* Event Title */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Event Title
          </label>
          <input
            type="text"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            placeholder="e.g. Indie Music Fest 2025"
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            required
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
            className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
            required
          />
        </div>

        {/* Event Date & Time */}
        <div className="flex flex-col sm:flex-row sm:gap-6 space-y-6 sm:space-y-0">
          <div className="w-full sm:flex-1">
            <label className="block mb-2 font-semibold text-gray-700">
              Event Date
            </label>
            <input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              required
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
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              required
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
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              required
            />
          </div>
        </div>

        {/* Venue & Organizer */}
        <div className="flex flex-col sm:flex-row sm:gap-6 space-y-6 sm:space-y-0">
          <div className="flex-1">
            <label className="block mb-2 font-semibold text-gray-700">
              Venue
            </label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. Siri Fort Auditorium, Delhi"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              required
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
              placeholder="e.g. Sports Committee, DU"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              required
            />
          </div>
        </div>

        {/* Ticket Info */}
        <div className="flex flex-col sm:flex-row sm:gap-6 space-y-6 sm:space-y-0">
          <div className="flex-1">
            <label className="block mb-2 font-semibold text-gray-700">
              Total Seats
            </label>
            <input
              type="number"
              value={totalSeats}
              onChange={(e) => setTotalSeats(e.target.value)}
              placeholder="e.g. 500"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              min={1}
              required
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
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              min={0}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-2 font-semibold text-gray-700">
              Event Type
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
              required
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
            className="w-5 h-5 accent-red-600"
          />
          <label htmlFor="featureEvent" className="font-medium text-gray-800">
            Feature this Event
          </label>
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className={`flex justify-center items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
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
            )}
            {loading ? "Submitting..." : "Add Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvents;
