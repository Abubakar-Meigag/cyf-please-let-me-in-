import "./home.css";
import React from "react";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const building = location.pathname.split("/")[1];

  return (
    <div className="home-container">
      {building ? (
        <>
          <h2 className="home-title">{building.charAt(0).toUpperCase() + building.slice(1)}</h2>
          <div className="button-container">
            <Link className="home-button" to={`/${building}/checkIn`}>Check In</Link>
            <Link className="home-button" to={`/${building}/guest`}>Let Me In</Link>
          </div>
        </>
      ) : (
        <>
          <h1 className="home-title">Choose Your Building</h1>
          <div className="button-container">
            <Link className="home-button" to="/cititec">Cititec</Link>
            <Link className="home-button" to="/bedford">Bedford</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
