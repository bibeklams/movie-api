import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function MovieCard({ movie, index }) {
  // Animation variants
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.03,
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: "#1e40af",
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: {
        duration: 0.2,
      },
    },
    tap: {
      scale: 0.95,
    },
  };

  const textVariants = {
    hover: {
      x: 5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg overflow-hidden cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"
        initial={false}
        animate={false}
      />

      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden h-72">
        <motion.img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full h-full object-cover"
          variants={imageVariants}
          whileHover="hover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Rating Badge (if you have rating field) */}
        {movie.rating && (
          <motion.div
            className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm rounded-full px-3 py-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-yellow-400 text-sm font-bold">
              ★ {movie.rating}
            </span>
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3 relative z-10">
        <div className="flex justify-between items-start">
          <motion.h2
            className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1"
            variants={textVariants}
          >
            {movie.title}
          </motion.h2>

          {/* Year Badge */}
          {movie.year && (
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded-full">
              {movie.year}
            </span>
          )}
        </div>

        {/* Genre with Icon */}
        <div className="flex items-center space-x-2 text-gray-600">
          <svg
            className="w-4 h-4 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
            />
          </svg>
          <p className="text-sm">
            <span className="font-semibold">Genre:</span> {movie.genre}
          </p>
        </div>

        {/* Duration if available */}
        {movie.duration && (
          <div className="flex items-center space-x-2 text-gray-600">
            <svg
              className="w-4 h-4 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm">{movie.duration} min</p>
          </div>
        )}

        {/* Price with Animation */}
        <motion.div
          className="flex items-baseline space-x-1"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-2xl font-bold text-green-600">
            Rs {movie.price}
          </span>
          <span className="text-sm text-gray-500">/ ticket</span>
        </motion.div>

        {/* View Details Button */}
        <Link to={`/movies/${movie._id}`}>
          <motion.button
            className="relative w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2.5 rounded-xl font-semibold overflow-hidden group/btn shadow-md"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {/* Button Shine Effect */}
            <motion.div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />

            <span className="relative flex items-center justify-center space-x-2">
              <span>View Details</span>
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                whileHover={{ x: 5 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </motion.svg>
            </span>
          </motion.button>
        </Link>

        {/* Quick Actions (Optional) */}
        <motion.div
          className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1.1 }}
        >
          <button className="bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
            <svg
              className="w-5 h-5 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default MovieCard;
