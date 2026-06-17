import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  getMovies,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../../services/movieService";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaTimes,
  FaImage,
  FaFilm,
  FaClock,
  FaCalendarAlt,
  FaTag,
  FaChair,
  FaDollarSign,
} from "react-icons/fa";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async () => {
    try {
      const response = await getMovies();
      setMovies(response.movies);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleDeleteMovie = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie? This action cannot be undone.",
    );

    if (!confirmDelete) return;

    try {
      await deleteMovie(id);
      await fetchMovies();
      alert("Movie deleted successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete movie");
    }
  };

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.genre.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading movies...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Movie Management</h1>
          <p className="text-gray-500 mt-1">
            Manage your movie catalog and showtimes
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedMovie(null);
            setShowForm(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 shadow-md transition-all"
        >
          <FaPlus size={16} />
          <span>Add New Movie</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Movies</p>
              <p className="text-2xl font-bold text-gray-800">
                {movies.length}
              </p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <FaFilm className="text-purple-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Seats</p>
              <p className="text-2xl font-bold text-gray-800">
                {movies.reduce((sum, movie) => sum + movie.totalSeats, 0)}
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <FaChair className="text-blue-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Avg. Price</p>
              <p className="text-2xl font-bold text-green-600">
                Rs.{" "}
                {movies.length > 0
                  ? (
                      movies.reduce((sum, movie) => sum + movie.price, 0) /
                      movies.length
                    ).toFixed(0)
                  : 0}
              </p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <FaDollarSign className="text-green-600 text-xl" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Genres</p>
              <p className="text-2xl font-bold text-orange-600">
                {new Set(movies.map((m) => m.genre)).size}
              </p>
            </div>
            <div className="bg-orange-50 p-3 rounded-lg">
              <FaTag className="text-orange-600 text-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies by title or genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Movie Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  S.No
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Movie
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Poster
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Genre
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Seats
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredMovies.length > 0 ? (
                filteredMovies.map((movie, index) => (
                  <tr
                    key={movie._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-800">
                          {movie.title}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {movie.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={movie.imageUrl}
                        alt={movie.title}
                        className="w-12 h-16 object-cover rounded-lg shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {movie.genre}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <FaClock size={12} />
                        <span>{movie.duration} min</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-lg font-bold text-green-600">
                        Rs. {movie.price}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm">
                        <FaChair size={12} className="text-gray-400" />
                        <span>{movie.totalSeats} seats</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => {
                            setSelectedMovie(movie);
                            setShowForm(true);
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors"
                        >
                          <FaEdit size={12} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteMovie(movie._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm flex items-center gap-1 transition-colors"
                        >
                          <FaTrash size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-12">
                    <div className="text-gray-400">
                      <FaFilm className="mx-auto text-4xl mb-3" />
                      <p className="text-gray-500">No movies found</p>
                      <p className="text-sm text-gray-400 mt-1">
                        {searchTerm
                          ? "Try adjusting your search"
                          : "Click 'Add New Movie' to get started"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        {filteredMovies.length > 0 && (
          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredMovies.length} of {movies.length} movies
            </p>
            <div className="flex gap-2">
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors">
                Previous
              </button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors">
                1
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-100 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Update Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white px-6 pt-6 pb-4 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    {selectedMovie ? "Update Movie" : "Add New Movie"}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedMovie
                      ? "Edit movie details"
                      : "Fill in the movie details"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowForm(false);
                    setSelectedMovie(null);
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <FaTimes size={24} />
                </button>
              </div>
            </div>

            <Formik
              enableReinitialize
              initialValues={{
                title: selectedMovie?.title || "",
                description: selectedMovie?.description || "",
                genre: selectedMovie?.genre || "",
                duration: selectedMovie?.duration || "",
                releaseDate: selectedMovie?.releaseDate?.split("T")[0] || "",
                price: selectedMovie?.price || "",
                totalSeats: selectedMovie?.totalSeats || "",
                image: null,
              }}
              onSubmit={async (values, { resetForm }) => {
                try {
                  const formData = new FormData();

                  Object.entries(values).forEach(([key, value]) => {
                    if (key === "image" && !value) return;
                    formData.append(key, value);
                  });

                  if (selectedMovie) {
                    await updateMovie(selectedMovie._id, formData);
                    alert("Movie updated successfully");
                  } else {
                    await addMovie(formData);
                    alert("Movie added successfully");
                  }

                  await fetchMovies();
                  resetForm();
                  setShowForm(false);
                  setSelectedMovie(null);
                } catch (error) {
                  alert(
                    error.response?.data?.message || "Something went wrong",
                  );
                }
              }}
            >
              {({ setFieldValue, values }) => (
                <Form className="p-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Movie Title *
                    </label>
                    <Field
                      name="title"
                      placeholder="Enter movie title"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      rows="3"
                      placeholder="Enter movie description"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Genre *
                      </label>
                      <Field
                        name="genre"
                        placeholder="e.g., Action, Comedy"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (minutes) *
                      </label>
                      <Field
                        type="number"
                        name="duration"
                        placeholder="120"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Release Date *
                      </label>
                      <Field
                        type="date"
                        name="releaseDate"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ticket Price (Rs.) *
                      </label>
                      <Field
                        type="number"
                        name="price"
                        placeholder="500"
                        className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Total Seats *
                    </label>
                    <Field
                      type="number"
                      name="totalSeats"
                      placeholder="100"
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Movie Poster *
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          setFieldValue("image", e.currentTarget.files[0])
                        }
                        className="flex-1 border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                      {values.image && (
                        <span className="text-sm text-green-600">
                          File selected
                        </span>
                      )}
                    </div>
                    {selectedMovie && !values.image && (
                      <p className="text-xs text-gray-500 mt-1">
                        Leave empty to keep current image
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all shadow-md"
                    >
                      {selectedMovie ? "Update Movie" : "Add Movie"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setSelectedMovie(null);
                      }}
                      className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieList;
