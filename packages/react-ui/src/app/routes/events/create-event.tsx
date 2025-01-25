import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddEventPage() {
  const navigate = useNavigate();
  const [eventDetails, setEventDetails] = useState({
    title: "",
    date: "",
    description: "",
    paymentMethod: "Cash", // Default payment method
    cost: "",
    image: null, // For storing the uploaded image
  });

  const handleSave = () => {
    // Save event details (e.g., send to an API)
    console.log("Event Details:", eventDetails);
    navigate("/events"); // Navigate back to the events page
  };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setEventDetails({ ...eventDetails, image: file });
//     }
//   };

  return (
    <div className="flex w-full items-center justify-center min-h-screen">
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add New Event</h1>
        <div className="space-y-4">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Event Image</label>
            <input
              type="file"
              accept="image/*"
            //   onChange={handleImageUpload}
              className="w-full p-2 border rounded"
            />
            {eventDetails.image && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(eventDetails.image)}
                  alt="Event Preview"
                  className="w-32 h-32 object-cover rounded"
                />
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={eventDetails.title}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, title: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium mb-1">Date</label>
            <input
              type="date"
              value={eventDetails.date}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, date: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={eventDetails.description}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, description: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Payment Method Dropdown */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Payment Method
            </label>
            <select
              value={eventDetails.paymentMethod}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, paymentMethod: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="Wallet">Wallet</option>
            </select>
          </div>

          {/* Cost */}
          <div>
            <label className="block text-sm font-medium mb-1">Cost</label>
            <input
              type="number"
              value={eventDetails.cost}
              onChange={(e) =>
                setEventDetails({ ...eventDetails, cost: e.target.value })
              }
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Save Event
          </button>
        </div>
      </div>
    </div>
  );
}