import React, { useEffect, useState } from "react";
import { adminDashboard } from "../../services/adminDashboardService";
import {
  FaUsers,
  FaFilm,
  FaTicketAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaMoneyBillWave,
  FaChair,
} from "react-icons/fa";

function DashboardStats() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalMovies: 0,
    totalBookings: 0,
    confirmedBookings: 0,
    cancelledBookings: 0,
    totalRevenue: 0,
    totalSeatBooked: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const adminStats = async () => {
      try {
        const response = await adminDashboard();
        setStats(response);
      } catch (error) {
        alert(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    adminStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading dashboard data...</div>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: FaUsers,
      color: "blue",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      title: "Total Movies",
      value: stats.totalMovies,
      icon: FaFilm,
      color: "purple",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      title: "Total Bookings",
      value: stats.totalBookings,
      icon: FaTicketAlt,
      color: "green",
      bgColor: "bg-green-50",
      textColor: "text-green-600",
    },
    {
      title: "Confirmed Bookings",
      value: stats.confirmedBookings,
      icon: FaCheckCircle,
      color: "emerald",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      title: "Cancelled Bookings",
      value: stats.cancelledBookings,
      icon: FaTimesCircle,
      color: "red",
      bgColor: "bg-red-50",
      textColor: "text-red-600",
    },
    {
      title: "Total Revenue",
      value: `Rs. ${stats.totalRevenue.toLocaleString()}`,
      icon: FaMoneyBillWave,
      color: "yellow",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
    {
      title: "Total Seats Booked",
      value: stats.totalSeatBooked,
      icon: FaChair,
      color: "indigo",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
        <p className="text-gray-500 mt-1">
          Welcome back! Here's what's happening with your cinema today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-500 text-sm font-medium mb-1">
                    {card.title}
                  </p>
                  <p className={`text-3xl font-bold ${card.textColor} mt-1`}>
                    {card.value}
                  </p>
                </div>
                <div className={`${card.bgColor} p-3 rounded-lg`}>
                  <card.icon className={`w-6 h-6 ${card.textColor}`} />
                </div>
              </div>
            </div>

            {/* Optional: Mini progress bar or trend indicator */}
            {card.title === "Total Revenue" && stats.totalRevenue > 0 && (
              <div className="px-6 pb-4">
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-yellow-500 h-1.5 rounded-full"
                    style={{
                      width: `${Math.min((stats.totalRevenue / 100000) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Insights Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Booking Success Rate */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Booking Insights
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Success Rate</span>
              <span className="font-semibold text-green-600">
                {stats.totalBookings > 0
                  ? (
                      (stats.confirmedBookings / stats.totalBookings) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{
                  width:
                    stats.totalBookings > 0
                      ? `${(stats.confirmedBookings / stats.totalBookings) * 100}%`
                      : "0%",
                }}
              />
            </div>

            <div className="flex justify-between items-center mt-4">
              <span className="text-gray-600">Cancellation Rate</span>
              <span className="font-semibold text-red-600">
                {stats.totalBookings > 0
                  ? (
                      (stats.cancelledBookings / stats.totalBookings) *
                      100
                    ).toFixed(1)
                  : 0}
                %
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full"
                style={{
                  width:
                    stats.totalBookings > 0
                      ? `${(stats.cancelledBookings / stats.totalBookings) * 100}%`
                      : "0%",
                }}
              />
            </div>
          </div>
        </div>

        {/* Revenue Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Revenue Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-gray-600">Average per Booking</span>
              <span className="font-semibold text-gray-800">
                Rs.{" "}
                {stats.totalBookings > 0
                  ? (stats.totalRevenue / stats.totalBookings).toFixed(0)
                  : 0}
              </span>
            </div>
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-gray-600">Average Seats per Booking</span>
              <span className="font-semibold text-gray-800">
                {stats.totalBookings > 0
                  ? (stats.totalSeatBooked / stats.totalBookings).toFixed(1)
                  : 0}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-600">Revenue per Movie</span>
              <span className="font-semibold text-gray-800">
                Rs.{" "}
                {stats.totalMovies > 0
                  ? (stats.totalRevenue / stats.totalMovies).toFixed(0)
                  : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardStats;
