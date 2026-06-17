import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      unique: true,
      minlength: 3,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      minlength: 3,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      min: 1,
      required: true,
    },

    releaseDate: {
      type: Date,
      required: true,
    },

    price: {
      type: Number,
      min: 100,
      max: 1000,
      required: true,
    },
    totalSeats: {
      type: Number,
      min: 0,
      default: 100,
      required: true,
    },
    availableSeats: {
      type: Number,
      min: 0,
      default: 100,
    },
  },
  {
    timestamps: true,
  },
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
