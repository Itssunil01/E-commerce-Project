import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-700";

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      {/* Logo / Brand */}
      <Link
        to="/"
        className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
      >
         All In One Store
      </Link>

      {/* Navigation Links */}
      <div className="flex gap-6">
        <Link to="/" className={`${isActive("/")} hover:text-blue-600`}>
          Home
        </Link>
        <Link to="/cart" className={`${isActive("/cart")} hover:text-blue-600`}>
          Cart
        </Link>
        <Link
          to="/checkout"
          className={`${isActive("/checkout")} hover:text-blue-600`}
        >
          Checkout
        </Link>
      </div>
    </nav>
  );
}
