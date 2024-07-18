import React from "react";
import { Link, Outlet } from "react-router-dom";

function Building({ buildingName }) {
  return (
    <div>
      <h2>{buildingName}</h2>
      <nav>
        <ul>
          <li>
            <Link to="checkIn">Check In</Link>
          </li>
          <li>
            <Link to="guest">Guest</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Building;
