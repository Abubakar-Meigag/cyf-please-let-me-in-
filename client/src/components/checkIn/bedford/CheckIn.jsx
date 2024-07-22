import "./checkIn.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckIn = () => {
  const [checkInPeople, setCheckInPeople] = useState([]);
  const [getFormData, setGetFormData] = useState([]);
  const [slackUser, setSlackUser] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // get data from key holder select
  const fetchData = async () => {
    const url = "http://localhost:3099/data";
    try {
      const response = await axios.get(url);
      setCheckInPeople(response.data);
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

    const formData = { slackUser, phoneNumber }

    try {
      const response =await fetch(`http://localhost:3099/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(formData)
      })

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
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  useEffect(() => {
    fetchData();
    guestData();
  }, []);

  return (
    <div className="checkIn-container">
      <div className="checkIn-content">
        <div className="key-holder-section">
          <h2>
            CheckIn <span className="building-name">Bedford</span> Key Holder
          </h2>
          <select className="checkIn-input">
            <option>Select Your Name</option>
            {checkInPeople.map((element) => (
              <option className="checkIn-input" key={element.id} >
                {element.slack_user}
              </option>
            ))}
          </select>

          <div className="button-group">
            <button className="checkIn-button">CheckIn</button>
            <button className="checkIn-button">CheckOut</button>
          </div>

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

            <button 
                className="checkIn-button submit-btn"
                type="submit"
            >
              Submit
            </button>
          </form>

          <div className="key-holder-section">
            <select className="checkIn-input">
              <option>Select Your Name</option>
              {getFormData.map((element) => (
                <option className="checkIn-input" key={element.id} >
                  {element.slack_user}{" "}
                </option>
              ))}
            </select>

            <div className="button-group">
              <button className="checkIn-button">
                CheckOut
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
