import React from "react";
import { Link, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const building = location.pathname.split("/")[1];

  return (
    <div>
      {building ? (
        <>
          <h2>{building.charAt(0).toUpperCase() + building.slice(1)}</h2>
          <button>
            <Link to={`/${building}/checkIn`}>Check In</Link>
          </button>
          <button>
            <Link to={`/${building}/guest`}>Let Me In</Link>
          </button>
        </>
      ) : (
        <>
          <h1>Choose Your Building</h1>
          <button>
            <Link to="/cititec">Cititec</Link>
          </button>
          <button>
            <Link to="/bedford">Bedford</Link>
          </button>
        </>
      )}
    </div>
  );
}

export default Home;
