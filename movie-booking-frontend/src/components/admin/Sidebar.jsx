import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTachometerAlt,
  FaUsers,
  FaFilm,
  FaTicketAlt,
  FaSignOutAlt,
  FaCog,
  FaBars,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";
import image from "../../assets/logo.png";

function Sidebar() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = () => {
    // Add logout confirmation
    if (window.confirm("Are you sure you want to logout?")) {
      // Clear any stored user data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const menuItems = [
    { to: "/admin", label: "Dashboard", icon: FaTachometerAlt, end: true },
    { to: "/admin/users", label: "Users", icon: FaUsers },
    { to: "/admin/movies", label: "Movies", icon: FaFilm },
    { to: "/admin/bookings", label: "Bookings", icon: FaTicketAlt },
  ];

  const sidebarVariants = {
    expanded: {
      width: "280px",
      transition: { duration: 0.3, type: "spring", stiffness: 300 },
    },
    collapsed: {
      width: "80px",
      transition: { duration: 0.3, type: "spring", stiffness: 300 },
    },
    mobileOpen: { x: 0, transition: { duration: 0.3 } },
    mobileClosed: { x: "-100%", transition: { duration: 0.3 } },
  };

  const menuItemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
    hover: {
      scale: 1.05,
      x: 5,
      transition: { duration: 0.2 },
    },
  };

  const logoVariants = {
    hover: {
      scale: 1.1,
      rotate: 360,
      transition: { duration: 0.5 },
    },
  };

  // Close mobile menu when screen resizes above mobile breakpoint
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileOpen) {
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileOpen]);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-3 rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        {isMobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial="expanded"
        animate={
          isCollapsed && !isMobileOpen
            ? "collapsed"
            : isMobileOpen
              ? "mobileOpen"
              : "expanded"
        }
        variants={sidebarVariants}
        className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl z-50 overflow-hidden ${
          isMobileOpen ? "block" : "hidden md:block"
        }`}
      >
        {/* Collapse Toggle Button (Desktop only) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex absolute -right-3 top-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all z-10"
        >
          <motion.div
            animate={{ rotate: isCollapsed ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </motion.div>
        </button>

        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <motion.div
            variants={logoVariants}
            whileHover="hover"
            className="flex justify-center items-center py-8 border-b border-gray-700"
          >
            <div className="relative">
              <motion.img
                src={image}
                alt="logo"
                className="h-16 w-16 object-cover rounded-full border-2 border-gradient-to-r from-purple-500 to-pink-500 shadow-lg"
                whileHover={{ scale: 1.05 }}
              />
              <motion.div
                className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* User Info (when expanded) */}
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 py-6 border-b border-gray-700"
              >
                <div className="flex items-center gap-3">
                  <FaUserCircle size={40} className="text-purple-400" />
                  <div>
                    <p className="font-semibold text-sm">Admin User</p>
                    <p className="text-xs text-gray-400">admin@example.com</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Menu */}
          <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto custom-scrollbar">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.to}
                custom={index}
                initial="initial"
                animate="animate"
                variants={menuItemVariants}
                whileHover="hover"
              >
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                      isActive
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <item.icon
                        size={20}
                        className={`transition-transform group-hover:scale-110 ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      />
                      <AnimatePresence>
                        {!isCollapsed && (
                          <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="font-medium"
                          >
                            {item.label}
                          </motion.span>
                        )}
                      </AnimatePresence>

                      {/* Tooltip for collapsed state */}
                      {isCollapsed && (
                        <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-20">
                          {item.label}
                        </div>
                      )}

                      {/* Active Indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 w-1 h-8 bg-white rounded-r-full"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Bottom Section */}
          <div className="p-3 border-t border-gray-700">
            {/* Settings Button */}
            <motion.div
              variants={menuItemVariants}
              custom={menuItems.length}
              initial="initial"
              animate="animate"
              whileHover="hover"
            >
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 hover:text-white transition-all group relative"
                onClick={() => navigate("/admin/settings")}
              >
                <FaCog
                  size={20}
                  className="transition-transform group-hover:rotate-90"
                />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-medium"
                    >
                      Settings
                    </motion.span>
                  )}
                </AnimatePresence>
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                    Settings
                  </div>
                )}
              </button>
            </motion.div>

            {/* Logout Button */}
            <motion.div
              variants={menuItemVariants}
              custom={menuItems.length + 1}
              initial="initial"
              animate="animate"
              whileHover="hover"
              className="mt-2"
            >
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white transition-all group relative shadow-md hover:shadow-lg"
              >
                <FaSignOutAlt
                  size={20}
                  className="transition-transform group-hover:translate-x-1"
                />
                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="font-medium"
                    >
                      Logout
                    </motion.span>
                  )}
                </AnimatePresence>
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-2 py-1 bg-red-600 text-white text-sm rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
                    Logout
                  </div>
                )}
              </button>
            </motion.div>
          </div>
        </div>
      </motion.aside>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }

        /* Border gradient utility */
        .border-gradient-to-r {
          border-image: linear-gradient(to right, #8b5cf6, #ec4899) 1;
        }
      `}</style>
    </>
  );
}

export default Sidebar;
