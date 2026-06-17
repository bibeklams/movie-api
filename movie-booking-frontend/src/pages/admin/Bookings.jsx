import React from "react";
import BookingList from "../../components/admin/BookingList";

function Bookings() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Booking Management
          </h1>
          <p className="text-gray-500 mt-1">
            View and manage all movie bookings.
          </p>
        </div>

        {/* Booking Table */}
        <BookingList />
      </div>
    </main>
  );
}

export default Bookings;
