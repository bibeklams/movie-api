import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },

    seats: {
      type: Number,
      required: true,
      min: 1,
    },
    bookedSeats: {
      type: [String],
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    bookingDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  {
    timestamps: true,
  },
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
