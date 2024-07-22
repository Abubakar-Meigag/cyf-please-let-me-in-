import "./checkIn.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckIn = () => {
  const [checkInPeople, setCheckInPeople] = useState([]);
  const [getFormData, setGetFormData] = useState([]);
  const [slackUser, setSlackUser] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // get data from key holder select
  const fetchData = async () => {
    const url = "http://localhost:3099/data";
    try {
      const response = await axios.get(url);
      setCheckInPeople(response.data);

      const initialStatus = response.data.reduce((acc, user) => {
        acc[user.slack_user] = user.status;
        return acc;
      }, {});
      setStatus(initialStatus);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  // post data from the form to bedford_guest database
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!slackUser || !phoneNumber) {
      alert("You must fill all the required fields");
      return;
    }

    const formData = { slackUser, phoneNumber };

    try {
      const response = await fetch(`http://localhost:3099/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        alert(`Error: ${errorData.message || "Something went wrong!"}`);
        return;
      }

      window.location = "/bedford/guest";
    } catch (err) {
      console.error(err.message);
    }
  };

  // get data from bedford_guest
  const guestData = async () => {
    const url = "http://localhost:3099/formData";
    try {
      const response = await axios.get(url);
      setGetFormData(response.data);

      const initialStatus = response.data.reduce((acc, user) => {
        acc[user.slack_user] = user.status;
        return acc;
      }, {});
      setStatus(initialStatus);

    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  useEffect(() => {
    fetchData();
    guestData();
  }, []);

  // check in key holder 
  const checkMeIn = async () => {
    const url = "http://localhost:3099/checkIn"
    const body = { slack_user: slackUser}

    if (!slackUser) {
      alert ('Please select your slack name')
      return;
    }

    try {
      const res = await axios.put(url, body);
      if ( res.status === 200) {
        setStatus((prevStatus) => ({
          ...prevStatus,
          [slackUser] : "in",
        }));
        setSuccess(res.data.error);
        setError(null);
      }

      window.location = "/bedford/guest";
    } catch (err) {
      setError(err.response ? err.response.data.error : "Internal server error");
      setSuccess(null);
    }
  }

  // check out key holder
  const checkMeOut = async () => {
    const url = "http://localhost:3099/checkOut"
    const body = { slack_user: slackUser}

    if (!slackUser) {
      alert ('Please select your slack name')
      return;
    }

    try {
      const res = await axios.put(url, body);
      if ( res.status === 200) {
        setStatus((prevStatus) => ({
          ...prevStatus,
          [slackUser] : "out",
        }));
        setSuccess(res.data.error);
        setError(null);
      }

      window.location = "/bedford/guest";
    } catch (err) {
      setError(err.response ? err.response.data.error : "Internal server error");
      setSuccess(null);
    }
  }

  // check out non key holder 
  const guestCheckOut = async () => {
    const url = "http://localhost:3099/formCheckOut"
    const boyd = { slack_user: slackUser }

    if (!slackUser) {
      alert('please select a your slack user..!!!')
      return;
    }

    try {
      const res = await axios.put(url, boyd);
      if (res.status === 200) {
        setStatus((prevStatus) => ({
          ...prevStatus,
          [slackUser]: "out",
        }))
      }

      // to invoke delete function after checkout is successful
       await deleteFormUser();
       window.location = "/bedford/guest";
    } catch (err) {
      setError(err.response ? err.response.data.error : "Internal server error");
      setSuccess(null);
    }
  }

  const deleteFormUser = async () => {
    const url = "http://localhost:3099/delete";
    const body = { slackUser };
  
    if (!slackUser) {
      alert("Please select a Slack user.");
      return;
    }
  
    try {
      const res = await axios.delete(url, { data: body });
      if (res.status === 200) {
        setSuccess("Data deleted successfully.");
        setError(null);
        
        fetchData();  
        guestData();  
      }
    } catch (err) {
      setError(err.response ? err.response.data.error : "Internal server error");
      setSuccess(null);
    }
  };
  

  return (
    <div className="checkIn-container">
      <div className="checkIn-content">
        <div className="key-holder-section">
          <h2>
            CheckIn <span className="building-name">Bedford</span> Key Holder
          </h2>
          <select 
              className="checkIn-input"
              value={slackUser}
              onChange={(e) => setSlackUser(e.target.value)}
          >
            <option value="">Select Your Name</option>
            {checkInPeople.map((element, index) => (
              <option className="checkIn-input" key={element.slack_user} value={element.slack_user}>
                {element.slack_user}
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
              Check Out
            </button>
          </div>

          {success && <div className="message success">{success}</div>}
          {error && <div className="message error">{error}</div>}

          <hr />
        </div>

        <div className="non-key-holder-section">
          <h2>Non Key Holder CheckIn/out</h2>

          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Slack User</label>
              <input
                type="text"
                name="slack_user"
                placeholder="Enter Name"
                value={slackUser}
                onChange={(e) => setSlackUser(e.target.value)}
                className="checkIn-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone_number"
                placeholder="Enter Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="checkIn-input"
                required
              />
            </div>

            <button className="checkIn-button submit-btn" type="submit">
              Submit
            </button>
          </form>

          <div className="key-holder-section">
            <select 
              className="checkIn-input"
              value={slackUser}
              onChange={(e) => setSlackUser(e.target.value)}
            >
              <option>Select Your Name</option>
              {getFormData.map((element, index) => (
                <option className="checkIn-input" key={element.slack_user} value={element.slack_user}>
                  {element.slack_user}
                </option>
              ))}
            </select>

            <div className="button-group">
              <button 
                  className="checkIn-button"
                  onClick={guestCheckOut}
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
    </div>
  );
};

export default CheckIn;
