import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import "./Header.scss";

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <div className="logo--container">
        <NavLink to="/create" title="Go to HRnet Home">
          <img
            className="logo"
            src={Logo}
            alt="Wealth Health logo"
          />
        </NavLink>
      </div>
      <h1>HRnet</h1>
      <nav>
        {location.pathname === "/create" && (
          <NavLink to="/" title="View the list of employees">
            <span>View of employees</span>
          </NavLink>
        )}
        {location.pathname === "/" && (
          <NavLink to="/create" title="Create a new employee" className="button-create">
            Create a new employee
          </NavLink>
        )}
      </nav>
    </header>
  );
}
