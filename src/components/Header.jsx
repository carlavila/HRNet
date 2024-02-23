import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import "./Header.scss";

export default function Header() {
  const location = useLocation();

  return (
    <header>
      <div className="logo--container">
        <NavLink to="/create">
          <img className="logo" src={Logo} alt={"Wealth Health logo"} />
        </NavLink>
      </div>
      <h1>HRnet</h1>
      <nav>
        {location.pathname === "/create" && (
          <NavLink to="/">
            <span>Employees</span>
          </NavLink>
        )}
        {location.pathname === "/" && (
          <button
            type="button"
            className="button-create"
            onClick={() => (window.location.href = "/create")}
          >
            Create a new employee
          </button>
        )}
      </nav>
    </header>
  );
}
