import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username'); // Retrieve the username from localStorage

  const handleLogout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    // Redirect to the sign-in page
    navigate('/signin');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink className="navbar-brand" to="/">
        LingoMingle
      </NavLink>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto">
          {username ? (
            <>
              <li className="nav-item">
                <span className="nav-link">{username}</span>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/create">
                  Create Account
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/signin">
                  Sign in
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
