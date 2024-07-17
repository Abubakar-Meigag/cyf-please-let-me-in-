import './navBar.css';
import React from 'react'
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className='nav-container'>
      <ul>
            <li>
            <Link to="/">
                  Home
            </Link>
            </li>

            <li>
            <Link to="/checkIn">
                  CheckIn
            </Link>
            </li>
      </ul>
    </div>
  )
}

export default NavBar