import React from "react";
import { Link } from "react-router-dom";
import {
  IoHome,
  IoBusiness,
  // IoAdd,
  IoLogInSharp,
  IoBody,
} from "react-icons/io5";
import "./navBar.css";

const NavBar = () => {
  return (
    <nav className="navbar-container">
      <ul className="navbar-menu">
        <li>
          <Link to="/" className="navbar-link">
            <div className="navbar-item">
              <IoHome />
              <span>Home</span>
            </div>
          </Link>
        </li>

        <li className="navbar-dropdown">
          <div className="navbar-item">
            <IoBusiness />
            <span>Bedford</span>
          </div>
          <ul className="dropdown-menu">
            <li className="building-item">
              <div className="dropdown-header">
              </div>
                <li>
                  <Link to="/bedford/checkIn" className="sub-menu-link">
                    <IoLogInSharp />
                    Check-In
                  </Link>
                </li>
                <li>
                  <Link to="/bedford/guest" className="sub-menu-link">
                    <IoBody />
                    Let Me In
                  </Link>
                </li>
            </li>
          </ul>
        </li>

        <li className="navbar-dropdown">
          <div className="navbar-item">
            <IoBusiness />
            <span>Cititec</span>
          </div>
          <ul className="dropdown-menu">
            <li className="building-item">
              <div className="dropdown-header">
              </div>
                <li>
                  <Link to="/cititec/checkIn" className="sub-menu-link">
                    <IoLogInSharp />
                    Check-In
                  </Link>
                </li>
                <li>
                  <Link to="/cititec/guest" className="sub-menu-link">
                    <IoBody />
                    Let Me In
                  </Link>
                </li>
            </li>
          </ul>
        </li>


      </ul>
    </nav>
  );
};

export default NavBar;
