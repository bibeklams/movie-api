import Movie from "../models/Movie.js";
import Booking from "../models/Booking.js";
import { throwError } from "../utils/errorHandler.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../utils/cloudinaryHandler.js";
export const addMovie = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      genre,
      duration,
      releaseDate,
      availableSeats,
    } = req.body;

    if (!req.file) {
      throwError("Image required", 400);
    }
    console.log(req.file);

    const result = await uploadToCloudinary(req.file.buffer);

    try {
      const movie = await Movie.create({
        title,
        description,
        price,
        imageUrl: result.secure_url,
        publicId: result.public_id,
        genre,
        duration,
        releaseDate,
        availableSeats,
      });

      res.status(201).json({
        success: true,
        message: "Movie successfully added",
        movie,
      });
    } catch (error) {
      await cloudinary.uploader.destroy(result.public_id);
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const getAllMovie = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    if (movies.length === 0) {
      throwError("No movie found", 404);
    }
    res.status(200).json({
      success: true,
      movies,
    });
  } catch (error) {
    next(error);
  }
};
export const getSingleMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      throwError("No movie found", 404);
    }

    const bookings = await Booking.find({
      movie: movie._id,
    });

    const bookedSeats = bookings.flatMap((booking) => booking.bookedSeats);

    res.status(200).json({
      success: true,
      movie,
      bookedSeats,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMovie = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      genre,
      availableSeats,
      duration,
      releaseDate,
    } = req.body;

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
      throwError("No movie found", 404);
    }

    movie.title = title ?? movie.title;
    movie.description = description ?? movie.description;
    movie.genre = genre ?? movie.genre;
    movie.price = price ?? movie.price;
    movie.releaseDate = releaseDate ?? movie.releaseDate;
    movie.availableSeats = availableSeats ?? movie.availableSeats;
    movie.duration = duration ?? movie.duration;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer);
      await cloudinary.uploader.destroy(movie.publicId);

      movie.imageUrl = result.secure_url;
      movie.publicId = result.public_id;
    }
    await movie.save();

    res.status(200).json({
      success: true,
      message: "Successfully Updated",
      movie,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMovie = async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) {
    throwError("No movie found", 404);
  }

  await movie.deleteOne();

  try {
    await cloudinary.uploader.destroy(movie.publicId);
  } catch (error) {
    console.error("Cloudinary delete failed", error);
  }

  res.status(200).json({
    success: true,
    message: "Movie deleted",
  });
};
