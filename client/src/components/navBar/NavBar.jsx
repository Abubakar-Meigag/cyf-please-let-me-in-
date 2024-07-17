import './navBar.css';
import React from 'react'
import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { IoLogInSharp } from "react-icons/io5";

const NavBar = () => {
  return (
    <div className='nav-container'>
      <ul className='navBar'>
            <li>
              <Link to="/">
                <div className='nav-item'>
                  <IoHome />
                  <span>Home</span>
                </div>
              </Link>
            </li>

            <li>
              <Link to="/checkIn">
                <div className='nav-item'>
                  <IoLogInSharp />
                  <span>CheckIn</span>
                </div>
              </Link>
            </li>
      </ul>
    </div>
  )
}

export default NavBar