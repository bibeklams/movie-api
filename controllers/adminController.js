import User from "../models/Users.js";
import Bookings from "../models/Booking.js";
import Movie from "../models/Movie.js";
import { throwError } from "../utils/errorHandler.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    if (users.length === 0) {
      throwError("No user found", 404);
    }
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      throwError("No user found", 404);
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Bookings.find()
      .populate("user", "email")
      .populate("movie", "title imageUrl genre availableSeats price");
    if (bookings.length === 0) {
      throwError("No bookings found", 404);
    }
    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    next(error);
  }
};
export const getSingleBooking = async (req, res, next) => {
  try {
    const booking = await Bookings.findById(req.params.id)
      .populate("user", "name email")
      .populate("movie", "title imageUrl genre");
    if (!booking) {
      throwError("No booking found", 404);
    }
    res.status(200).json({
      success: true,
      booking,
    });
  } catch (error) {
    next(error);
  }
};
export const adminDashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();

    const totalMovies = await Movie.countDocuments();

    const totalBookings = await Bookings.countDocuments();

    const confirmedBookings = await Bookings.countDocuments({
      status: "confirmed",
    });

    const cancelledBookings = await Bookings.countDocuments({
      status: "cancelled",
    });

    const revenueBookings = await Bookings.find({
      status: "confirmed",
    });
    const bookings = await Bookings.find({
      status: "confirmed",
    });
    const totalSeatBooked = bookings.reduce(
      (sum, booked) => sum + booked.seats,
      0,
    );
    const totalRevenue = revenueBookings.reduce(
      (sum, booking) => sum + booking.totalPrice,
      0,
    );

    res.status(200).json({
      success: true,
      totalUsers,
      totalMovies,
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      totalRevenue,
      totalSeatBooked,
    });
  } catch (error) {
    next(error);
  }
};
