import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <NavLink className="navbar-brand" to="/">CWSMS</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/car">Car</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/packages">Packages</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/service-package">Service Package</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/payment">Payment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/reports">Reports</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/logout">Logout</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;