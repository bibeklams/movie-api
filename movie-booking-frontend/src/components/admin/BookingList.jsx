import React, { useEffect, useState } from "react";
import { getAllBookings } from "../../services/adminDashboardService";
import { getMyBookings } from "../../services/bookingService";
import {
  FaTicketAlt,
  FaUser,
  FaFilm,
  FaChair,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSearch,
  FaFilter,
  FaDownload,
  FaEye,
  FaSync,
} from "react-icons/fa";

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await getAllBookings();
      setBookings(response.bookings);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [refreshKey]);

  // Filter bookings based on search and status
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.movie?.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "ALL" || booking.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  // Statistics
  const confirmedBookings = bookings.filter(
    (b) => b.status === "confirmed",
  ).length;
  const cancelledBookings = bookings.filter(
    (b) => b.status === "cancelled",
  ).length;
  const totalRevenue = bookings.reduce(
    (sum, b) => sum + (b.totalPrice || 0),
    0,
  );

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Function to get user booking details (if needed for specific user)
  const handleViewUserBookings = async (userId) => {
    try {
      const userBookings = await getMyBookings();
      console.log("User bookings:", userBookings);
      // You can show this in a separate modal or filter the bookings
      alert(
        `Found ${userBookings.bookings?.length || 0} bookings for this user`,
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch user bookings");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-sm">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-500">Loading bookings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Booking Management
          </h1>
          <p className="text-gray-500 mt-1">
            Track and manage all customer bookings
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleRefresh}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
          >
            <FaSync size={16} />
            <span>Refresh</span>
          </button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <FaDownload size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Bookings</p>
              <p className="text-2xl font-bold text-gray-800">
                {bookings.length}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FaTicketAlt className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">
                {confirmedBookings}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <FaCheckCircle className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">
                {cancelledBookings}
              </p>
            </div>
            <div className="bg-red-50 p-3 rounded-lg">
              <FaTimesCircle className="text-red-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <p className="text-2xl font-bold text-yellow-600">
                Rs. {totalRevenue.toLocaleString()}
              </p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-lg">
              <FaMoneyBillWave className="text-yellow-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex-1 min-w-[250px]">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by user email or movie title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <div className="relative">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="ALL">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
            </div>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Movie
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Seats
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Booking Date
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredBookings.length > 0 ? (
                filteredBookings.map((booking, index) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                          {booking.user?.name?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-800">
                            {booking.user?.name || "N/A"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {booking.user?.email || "No email"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">
                          {booking.movie?.title || "N/A"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {booking.movie?.genre || "No genre"}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {booking.bookedSeats?.slice(0, 3).map((seat, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            <FaChair size={10} className="mr-1" />
                            {seat}
                          </span>
                        ))}
                        {booking.bookedSeats?.length > 3 && (
                          <span className="text-xs text-gray-500">
                            +{booking.bookedSeats.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-lg font-bold text-green-600">
                        Rs. {booking.totalPrice?.toLocaleString() || 0}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <FaCalendarAlt size={12} className="text-gray-400" />
                        <span>
                          {new Date(booking.bookedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(booking.bookedDate).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {booking.status === "confirmed" ? (
                          <FaCheckCircle size={10} className="mr-1" />
                        ) : (
                          <FaTimesCircle size={10} className="mr-1" />
                        )}
                        {booking.status?.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                          title="View Details"
                        >
                          <FaEye size={18} />
                        </button>
                        <button
                          onClick={() =>
                            handleViewUserBookings(booking.user?._id)
                          }
                          className="text-purple-600 hover:text-purple-800 transition-colors"
                          title="View User's All Bookings"
                        >
                          <FaTicketAlt size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-12">
                    <div className="text-gray-400">
                      <FaTicketAlt className="mx-auto text-4xl mb-3" />
                      <p className="text-gray-500">No bookings found</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {searchTerm || filterStatus !== "ALL"
                          ? "Try adjusting your search or filter criteria"
                          : "No bookings have been made yet"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredBookings.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Booking Details
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Booking ID: {selectedBooking._id}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBooking(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimesCircle size={24} />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaUser className="text-blue-600" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Name</p>
                    <p className="font-medium text-gray-800">
                      {selectedBooking.user?.name || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">
                      {selectedBooking.user?.email || "N/A"}
                    </p>
                  </div>
                  {selectedBooking.user?.phone && (
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-800">
                        {selectedBooking.user.phone}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Movie Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaFilm className="text-purple-600" />
                  Movie Information
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Movie Title</p>
                    <p className="font-medium text-gray-800">
                      {selectedBooking.movie?.title || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Genre</p>
                    <p className="font-medium text-gray-800">
                      {selectedBooking.movie?.genre || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium text-gray-800">
                      {selectedBooking.movie?.duration || "N/A"} mins
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Release Date</p>
                    <p className="font-medium text-gray-800">
                      {selectedBooking.movie?.releaseDate
                        ? new Date(
                            selectedBooking.movie.releaseDate,
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  {selectedBooking.movie?.language && (
                    <div>
                      <p className="text-sm text-gray-500">Language</p>
                      <p className="font-medium text-gray-800">
                        {selectedBooking.movie.language}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Booking Information */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <FaTicketAlt className="text-green-600" />
                  Booking Information
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Selected Seats</span>
                    <div className="flex flex-wrap gap-1 justify-end">
                      {selectedBooking.bookedSeats?.map((seat, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-1 rounded text-sm font-medium bg-blue-100 text-blue-800"
                        >
                          <FaChair size={10} className="mr-1" />
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Number of Seats</span>
                    <span className="font-semibold">
                      {selectedBooking.bookedSeats?.length || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Price per Seat</span>
                    <span className="font-medium">
                      Rs. {selectedBooking.movie?.price?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Total Price</span>
                    <span className="text-xl font-bold text-green-600">
                      Rs. {selectedBooking.totalPrice?.toLocaleString() || 0}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                    <span className="text-gray-600">Booking Date</span>
                    <span className="font-medium">
                      {new Date(selectedBooking.bookedDate).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Status</span>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        selectedBooking.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {selectedBooking.status?.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                {selectedBooking.status === "confirmed" && (
                  <button className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all">
                    Cancel Booking
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedBooking(null);
                  }}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingList;
