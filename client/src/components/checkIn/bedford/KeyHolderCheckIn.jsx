import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import "./checkIn.css";

const KeyHolderCheckIn = ({ checkInPeople, status, setStatus }) => {
  const [keyHolderSlackUser, setKeyHolderSlackUser] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const checkMeIn = async () => {
    const url = `https://cyf-please-let-me-in.onrender.com/checkIn`;
    const body = { slack_user: keyHolderSlackUser };

    if (!keyHolderSlackUser) {
      toast.error('Please select your slack name');
      return;
    }

    try {
      const res = await axios.put(url, body);
      if (res.status === 200) {
        setStatus((prevStatus) => ({
          ...prevStatus,
          [keyHolderSlackUser]: "in",
        }));
        setSuccess(res.data.error);
        setError(null);
      }

      toast.success(`Hey "${keyHolderSlackUser}" Welcome back, you have now Checked In successfully!`);
    } catch (err) {
      setError(err.response ? err.response.data.error : "Internal server error");
      setSuccess(null);
    }

    setKeyHolderSlackUser("");
  };

  const checkMeOut = async () => {
    const url = `https://cyf-please-let-me-in.onrender.com/checkOut`;
    const body = { slack_user: keyHolderSlackUser };

    if (!keyHolderSlackUser) {
      toast.error('Please select your slack name');
      return;
    }

    try {
      const res = await axios.put(url, body);
      if (res.status === 200) {
        setStatus((prevStatus) => ({
          ...prevStatus,
          [keyHolderSlackUser]: "out",
        }));
        setSuccess(res.data.error);
        setError(null);
      }

      toast.success(`Hey "${keyHolderSlackUser}", you have now Checked out successfully!`);
    } catch (err) {
      setError(err.response ? err.response.data.error : "Internal server error");
      setSuccess(null);
    }

    setKeyHolderSlackUser("");
  };

  const toggleCheckInOut = () => {
    if (status[keyHolderSlackUser] === "in") {
      checkMeOut();
    } else {
      checkMeIn();
    }
  };

  return (
    <div className="key-holder-section">
      <h2>
        CheckIn <span className="building-name">Bedford</span> Key Holder
      </h2>
      <select
        className="checkIn-input"
        value={keyHolderSlackUser}
        onChange={(e) => setKeyHolderSlackUser(e.target.value)}
      >
        <option value="">Select Your Name</option>
        {checkInPeople.map((element) => (
          <option key={element.slack_user} value={element.slack_user}>
            {element.slack_user}
          </option>
        ))}
      </select>

      <div className="button-group">
        <button
          className="checkIn-button"
          onClick={toggleCheckInOut}
          style={{ backgroundColor: status[keyHolderSlackUser] === "in" ? "red" : "#007bff" }}
        >
          {status[keyHolderSlackUser] === "in" ? "Check Out" : "Check In"}
        </button>
      </div>

      {success && <div className="message success">{success}</div>}
      {error && <div className="message error">{error}</div>}

      <hr />
    </div>
  );
};

export default KeyHolderCheckIn;
