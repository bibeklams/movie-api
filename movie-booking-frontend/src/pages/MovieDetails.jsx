import React, { useEffect, useState } from "react";
import { getMovieById } from "../services/movieService";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { bookMovie } from "../services/bookingService";
import { motion, AnimatePresence } from "framer-motion";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSeats, setShowSeats] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleBooking = async () => {
    try {
      const bookingData = {
        seats: selectedSeats.length,
        bookedSeats: selectedSeats,
      };

      const response = await bookMovie(id, bookingData);
      alert(response.message);
      setBookedSeats((prev) => [...prev, ...selectedSeats]);
      setSelectedSeats([]);
      setShowSeats(false);
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await getMovieById(id);
        setMovie(response.movie);
        setBookedSeats(response.bookedSeats);
      } catch (error) {
        alert(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const generateSeats = (totalSeats) => {
    const rows = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const seats = [];

    for (let i = 0; i < totalSeats; i++) {
      const row = rows[Math.floor(i / 10)];
      const seatNumber = (i % 10) + 1;
      seats.push(`${row}${seatNumber}`);
    }

    return seats;
  };

  const handleSeatSelect = (seat) => {
    if (bookedSeats?.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat],
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex justify-center items-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Movie not found
          </h1>
          <button
            onClick={() => navigate("/")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg"
          >
            Go Back Home
          </button>
        </motion.div>
      </div>
    );
  }

  const seats = generateSeats(movie.totalSeats);
  const totalPrice = selectedSeats.length * movie.price;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-10 px-4">
      {/* Background Animation */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Movie Details Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          showSeats ? "blur-sm scale-95" : ""
        }`}
      >
        <div className="grid md:grid-cols-2 gap-0">
          {/* Image Section */}
          <div className="relative overflow-hidden bg-gray-900 min-h-[400px]">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            <motion.img
              src={movie.imageUrl}
              alt={movie.title}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.7 }}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-10">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {movie.title}
                </h1>
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full px-3 py-1 shadow-lg">
                  <span className="text-white font-bold text-sm">HD</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {movie.genre}
                </span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                  {movie.duration} mins
                </span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  Release: {new Date(movie.releaseDate).toLocaleDateString()}
                </span>
              </div>

              <p className="text-gray-700 leading-relaxed mb-8 text-lg">
                {movie.description}
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600 font-semibold">
                    Price per ticket
                  </span>
                  <span className="text-3xl font-bold text-green-600">
                    Rs. {movie.price}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600 font-semibold">
                    Total Seats
                  </span>
                  <span className="text-xl font-bold text-gray-800">
                    {movie.totalSeats}
                  </span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                  <span className="text-gray-600 font-semibold">
                    Available Seats
                  </span>
                  <motion.span
                    key={movie.availableSeats}
                    initial={{ scale: 1.2, color: "#22c55e" }}
                    animate={{ scale: 1, color: "#166534" }}
                    className="text-2xl font-bold text-green-700"
                  >
                    {movie.availableSeats}
                  </motion.span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowSeats(true)}
                className="relative w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg overflow-hidden group"
              >
                <span className="relative z-10">🎬 Book Now</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Seat Selection Modal */}
      <AnimatePresence>
        {showSeats && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 px-8 pt-8 pb-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Select Your Seats
                    </h2>
                    <p className="text-gray-600 mt-1">{movie.title}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowSeats(false)}
                    className="text-3xl font-bold text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    ✕
                  </motion.button>
                </div>
              </div>

              <div className="p-8">
                {/* Legend */}
                <div className="flex justify-center gap-8 mb-8 flex-wrap">
                  {[
                    { color: "bg-gray-300", label: "Available" },
                    { color: "bg-green-500", label: "Selected" },
                    { color: "bg-red-500", label: "Booked" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div
                        className={`w-6 h-6 ${item.color} rounded-lg shadow-md`}
                      ></div>
                      <span className="text-gray-700 font-medium">
                        {item.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* Screen */}
                <div className="mb-12">
                  <div className="relative">
                    <div className="w-full h-3 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 rounded-full shadow-lg"></div>
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gray-800 text-white px-6 py-1 rounded-full text-sm font-bold">
                        SCREEN
                      </div>
                    </div>
                  </div>
                </div>

                {/* Seats Grid */}
                <div className="grid grid-cols-10 gap-3 mb-8">
                  {seats.map((seat, index) => {
                    const isBooked = bookedSeats?.includes(seat);
                    const isSelected = selectedSeats.includes(seat);

                    return (
                      <motion.button
                        key={seat}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.01 }}
                        disabled={isBooked}
                        onClick={() => handleSeatSelect(seat)}
                        whileHover={!isBooked ? { scale: 1.1, y: -2 } : {}}
                        whileTap={!isBooked ? { scale: 0.95 } : {}}
                        className={`h-12 rounded-lg text-sm font-bold transition-all duration-200 shadow-md ${
                          isBooked
                            ? "bg-gradient-to-br from-red-500 to-red-600 text-white cursor-not-allowed opacity-60"
                            : isSelected
                              ? "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-200"
                              : "bg-gradient-to-br from-gray-200 to-gray-300 text-gray-700 hover:from-purple-500 hover:to-pink-500 hover:text-white hover:shadow-lg"
                        }`}
                      >
                        {seat}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Summary Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-t-2 border-gray-200 pt-8 mt-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6"
                >
                  <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Selected Seats
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedSeats.length > 0 ? (
                          selectedSeats.map((seat) => (
                            <motion.span
                              key={seat}
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-bold"
                            >
                              {seat}
                            </motion.span>
                          ))
                        ) : (
                          <span className="text-gray-500 italic">
                            No seats selected
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-600 mb-1">Total Amount</p>
                      <motion.p
                        key={totalPrice}
                        initial={{ scale: 1.2, color: "#16a34a" }}
                        animate={{ scale: 1, color: "#15803d" }}
                        className="text-4xl font-bold text-green-700"
                      >
                        Rs. {totalPrice}
                      </motion.p>
                      <p className="text-sm text-gray-500 mt-1">
                        {selectedSeats.length} ticket(s)
                      </p>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={selectedSeats.length === 0}
                    onClick={handleBooking}
                    className="mt-6 w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    {selectedSeats.length > 0
                      ? `Confirm Booking (${selectedSeats.length} seats)`
                      : "Select seats to continue"}
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default MovieDetails;
