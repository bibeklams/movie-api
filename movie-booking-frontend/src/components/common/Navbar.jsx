import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import image from "../../assets/logo.png";
import { logoutApi } from "../../services/authService";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";

import {
  FaHome,
  FaTicketAlt,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    try {
      await logoutApi();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src={image}
            alt="logo"
            className="h-12 w-12 rounded-full object-cover"
          />
          <span className="text-2xl font-bold text-blue-600">MovieBook</span>
        </NavLink>

        {isAuthenticated && (
          <h2 className="hidden md:block text-gray-600 font-medium">
            Welcome, <span className="text-blue-600">{user?.name}</span>
          </h2>
        )}

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
          >
            <FaHome />
            <span>Home</span>
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/my-bookings"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaTicketAlt />
                <span>My Bookings</span>
              </NavLink>

              <NavLink
                to="/profile"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaUser />
                <span>Profile</span>
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
              >
                <FaSignInAlt />
                <span>Login</span>
              </NavLink>

              <NavLink
                to="/register"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <FaUserPlus />
                <span>Register</span>
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
