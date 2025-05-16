import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard" },
    { path: "/submit", label: "Submit" },
    { path: "/articles", label: "Articles" },
    { path: "/about", label: "About" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="crayon-menu">
      <div className="menu-container">
        <Link to="/" className="menu-title">
          AI Friendly
        </Link>

        <button className="menu-button" onClick={toggleMenu}>
          {isMenuOpen ? "×" : "≡"}
        </button>

        <div className={`menu-items ${isMenuOpen ? "open" : ""}`}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/auth/login"
            className="menu-item"
            onClick={() => setIsMenuOpen(false)}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
