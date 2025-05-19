import React, { useState, useEffect } from "react";
import { updateEvent } from "../api/apiService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; 

const EditEventModal = ({ isOpen, onClose, event, onUpdate }) => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    eventTitle: "",
    eventDescription: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (event) {
      setFormState({
        eventTitle: event.eventTitle || "",
        eventDescription: event.eventDescription || "",
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (!event?._id) throw new Error("Event ID is missing");

      const formDataToSend = {
        eventId: event._id,
        eventTitle: formState.eventTitle,
        eventDescription: formState.eventDescription,
      };

      const { data } = await updateEvent(formDataToSend);

      if (data.success) {
        onUpdate(data.event);
        toast.success("Event updated successfully!"); 
        onClose();
      } else {
        setError(data.message || "Failed to update event");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/signin");
      } else {
        setError(err.message || "Failed to update event");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-md">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Edit Event</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Event Title</label>
            <input
              type="text"
              name="eventTitle"
              value={formState.eventTitle}
              onChange={handleChange}
              required
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Event Description</label>
            <textarea
              name="eventDescription"
              value={formState.eventDescription}
              onChange={handleChange}
              rows="4"
              required
              className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEventModal;
