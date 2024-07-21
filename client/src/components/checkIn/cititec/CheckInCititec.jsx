import axios from "axios";
import "./checkIn.css";
import React, { useEffect, useState } from "react";

const CheckInCititec = () => {
  const [getData, setGetData] = useState([])

    // get data from bedford_guest
    const getCititecData = async () => {
      const url = "http://localhost:3099/getDataForCititec";
      try {
        const response = await axios.get(url);
        setGetData(response.data);
      } catch (error) {
        console.error("Error fetching modules:", error);
      }
    };

    useEffect(() => {
      getCititecData()
    }, [])
  
  return (
    <div className="checkIn-container">
      <div className="checkIn-content">
        <div className="key-holder-section">
          <h2>
            CheckIn <span className="building-name">Cititec</span> Key Holder
          </h2>

          <select className="checkIn-input">
              <option>Select Your Name</option>
              {getData.map((element) => (
                <option className="checkIn-input" key={element.id}>
                  {element.slack_user}{" "}
                </option>
              ))}
            </select>

          <div className="button-group">
            <button className="checkIn-button">CheckIn</button>
            <button className="checkIn-button">CheckOut</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInCititec;
