import React, { useEffect, useState } from "react";
import { getMyBookings, cancelBooking } from "../../services/bookingService";

function BookingTable() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const myBookings = async () => {
      try {
        const response = await getMyBookings();
        setBookings(response.bookings);
      } catch (error) {
        alert(error.response?.data?.message || "something went wrong");
      }
    };

    myBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?",
    );

    if (!confirmCancel) return;

    try {
      const response = await cancelBooking(bookingId);
      alert(response.message);

      // update UI
      setBookings((prev) =>
        prev.map((b) =>
          b._id === bookingId ? { ...b, status: "cancelled" } : b,
        ),
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to cancel booking");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">My Bookings</h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="p-3 text-left">Sn</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Movie</th>
                <th className="p-3 text-left">Booked Seats</th>
                <th className="p-3 text-left">Total Price</th>
                <th className="p-3 text-left">Booking Date</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {bookings.map((b, index) => (
                <tr
                  key={b._id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{index + 1}</td>
                  <td className="p-3">{b.user?.email}</td>
                  <td className="p-3 font-medium text-gray-800">
                    {b.movie?.title}
                  </td>
                  <td className="p-3">{b.bookedSeats?.join(", ")}</td>
                  <td className="p-3">Rs. {b.totalPrice}</td>
                  <td className="p-3">
                    {new Date(b.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        b.status === "cancelled"
                          ? "bg-red-100 text-red-600"
                          : "bg-green-100 text-green-600"
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => handleCancelBooking(b._id)}
                      disabled={b.status === "cancelled"}
                      className={`px-3 py-1 rounded text-white text-sm transition ${
                        b.status === "cancelled"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {b.status === "cancelled" ? "Cancelled" : "Cancel Ticket"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BookingTable;
