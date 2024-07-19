import "./home.css"
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
            <button className="home-button">
              <Link className="button-link" to={`/${building}/checkIn`}>Check In</Link>
            </button>
            <button  className="home-button">
              <Link className="button-link" to={`/${building}/guest`}>Let Me In</Link>
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="home-title" >Choose Your Building</h1>
          <div className="button-container"> 
            <button className="home-button">
              <Link className="button-link" to="/cititec">Cititec</Link>
            </button>
            <button className="home-button">
              <Link className="button-link" to="/bedford">Bedford</Link>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
