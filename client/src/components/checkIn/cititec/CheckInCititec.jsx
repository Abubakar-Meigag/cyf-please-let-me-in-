import axios from "axios";
import "./checkIn.css";
import React, { useEffect, useState } from "react";

const CheckInCititec = () => {
  const [getData, setGetData] = useState([]);
  const [slackUser, setSlackUser] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [status, setStatus] = useState({});

  // get data from bedford_guest
  const getCititecData = async () => {
    const url =`https://cyf-please-let-me-in.onrender.com/getDataForCititec`

    try {
      const response = await axios.get(url);
      setGetData(response.data);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  useEffect(() => {
    getCititecData();
  }, []);

  const checkMeIn = async () => {
    const url = `https://cyf-please-let-me-in.onrender.com/checkInCititec`;

    const body = { slack_user: slackUser };

    if (!slackUser) {
      alert("Please select your slack name");
      return;
    }

    try {
      const res = await axios.put(url, body);
      if (res.status === 200) {
        setStatus((prevStatus) => ({
          ...prevStatus,
          [slackUser]: "in",
        }));
      }

      window.location = "/cititec/guest";
    } catch (err) {
      setError(
        err.response ? err.response.data.error : "Internal server error"
      );
      setSuccess(null);
    }
  };

  const checkMeOut = async () => {
    const url = "https://cyf-please-let-me-in.onrender.com/checkOutCititec";
    const body = { slack_user: slackUser };

    if (!slackUser) {
      alert("Please select your slack name");
      return;
    }

    try {
      const res = await axios.put(url, body);
      if (res.status === 200) {
        setStatus((prevStatus) => ({
          ...prevStatus,
          [slackUser]: "out",
        }));
        setSuccess(res.data.error);
        setError(null);
      }

      window.location = "/cititec/guest";
    } catch (err) {
      setError(
        err.response ? err.response.data.error : "Internal server error"
      );
      setSuccess(null);
    }
  };

  return (
    <div className="checkIn-container">
      <div className="checkIn-content">
        <div className="key-holder-section">
          <h2>
            CheckIn <span className="building-name">Cititec</span> Key Holder
          </h2>

          <select
            className="checkIn-input"
            value={slackUser}
            onChange={(e) => setSlackUser(e.target.value)}
          >
            <option>Select Your Name</option>
            {getData.map((element) => (
              <option className="checkIn-input" key={element.slack_user} value={element.slack_user}>
                {element.slack_user}{" "}
              </option>
            ))}
          </select>

          <div className="button-group">
            <button
              className="checkIn-button"
              onClick={checkMeIn}
              disabled={status[slackUser] === "in"}
            >
              CheckIn
            </button>

            <button
              className="checkIn-button"
              onClick={checkMeOut}
              disabled={status[slackUser] === "out"}
            >
              CheckOut
            </button>
          </div>

          {success && <div className="message success">{success}</div>}
          {error && <div className="message error">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default CheckInCititec;
