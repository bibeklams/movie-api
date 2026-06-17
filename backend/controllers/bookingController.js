import Booking from "../models/Booking.js";
import Movie from "../models/Movie.js";
import { throwError } from "../utils/errorHandler.js";
import sendEmail from "../utils/sendMail.js";

export const bookMovie = async (req, res, next) => {
  try {
    const { seats, bookedSeats } = req.body;

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      throwError("Movie not found", 404);
    }

    if (!seats || seats < 1) {
      throwError("Please select at least 1 seat", 400);
    }

    if (!Array.isArray(bookedSeats) || bookedSeats.length !== seats) {
      throwError("Invalid seat selection", 400);
    }

    if (movie.availableSeats < seats) {
      throwError("Not enough seats available", 400);
    }

    const totalPrice = movie.price * seats;

    const booking = await Booking.create({
      user: req.user._id,
      movie: movie._id,
      seats,
      bookedSeats,
      totalPrice,
    });

    movie.availableSeats -= seats;
    await movie.save();

    const html = `
  <h1>🎬 Enjoy your movie</h1>

  <div>
    <img 
      src="${movie.imageUrl}" 
      height="150" 
      width="120"
    />
  </div>

  <p>Movie: ${movie.title}</p>
  <p>Booked Seats: ${bookedSeats.join(", ")}</p>
  <p>Total Price: ${totalPrice}</p>
`;

    await sendEmail(req.user.email, "Your Ticket", html);

    res.status(201).json({
      success: true,
      message: "Movie booked successfully",
      booking,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "movie",
      "title imageUrl price genre",
    );
    res.status(200).json({
      success: true,
      bookings,
      status: bookings.status,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelbooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      throwError("No booking found", 404);
    }

    if (booking.user.toString() !== req.user._id.toString()) {
      throwError("Unauthorized", 403);
    }

    if (booking.status === "cancelled") {
      throwError("Booking already cancelled", 400);
    }

    const movie = await Movie.findById(booking.movie);

    if (!movie) {
      throwError("Movie not found", 404);
    }

    movie.availableSeats += booking.seats;
    booking.status = "cancelled";

    await movie.save();
    await booking.save();

    res.status(200).json({
      success: true,
      message: "Cancelled booking successfully",
      booking,
    });
  } catch (error) {
    next(error);
  }
};
