import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h2 className="text-xl font-bold">🎬 Movie Booking</h2>
            <p className="text-sm text-gray-400">
              Book your favorite movies with ease.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="/" className="hover:text-yellow-400">
              Home
            </a>
            <a href="/login" className="hover:text-yellow-400">
              Login
            </a>
            <a href="/register" className="hover:text-yellow-400">
              Register
            </a>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} Movie Booking System. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
