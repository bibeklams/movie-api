import React from "react";
import { Formik, Field, Form } from "formik";
import { register } from "../../services/authService";
import { useNavigate, NavLink } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaFilm } from "react-icons/fa";

function RegisterForm() {
  const navigate = useNavigate();

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const data = await register(values);

      alert(data.message);

      resetForm();

      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex justify-center items-center px-4 relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2070&auto=format&fit=crop')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Register Card */}
      <div className="relative z-10 w-full max-w-md animate-[fadeIn_0.8s_ease-in-out]">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8">
          {/* Logo */}
          <div className="flex justify-center mb-4">
            <div className="bg-red-600 p-4 rounded-full shadow-lg">
              <FaFilm className="text-white text-3xl" />
            </div>
          </div>

          <h2 className="text-4xl font-bold text-center text-white mb-2">
            Create Account
          </h2>

          <p className="text-center text-gray-300 mb-8">
            Join and book your favorite movies
          </p>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
            }}
            onSubmit={handleSubmit}
          >
            <Form className="space-y-5">
              {/* Name */}
              <div className="relative">
                <FaUser className="absolute left-4 top-4 text-gray-400" />

                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Email */}
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                <Field
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <FaLock className="absolute left-4 top-4 text-gray-400" />

                <Field
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold text-lg transition duration-300 hover:scale-105 shadow-lg"
              >
                <FaUserPlus />
                Register
              </button>

              <p className="text-center text-gray-300">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  className="text-red-400 hover:text-red-300 font-semibold"
                >
                  Login
                </NavLink>
              </p>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
