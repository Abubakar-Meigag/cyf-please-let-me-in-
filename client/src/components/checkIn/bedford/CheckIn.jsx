import "./checkIn.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CheckIn = () => {
  const [checkInPeople, setCheckInPeople] = useState([]);
  const [getFormData, setGetFormData] = useState([]);
  const [postFormData, setPostFormData] = useState({
    slack_user: '',
    phone_number: '',
  });

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

    const { slack_user, phone_number } = postFormData;
    
    if (!slack_user || !phone_number) {
      alert("You must fill all the required fields");
      return;
    }

    try {
      await axios.post("http://localhost:3099/submit", postFormData, {
        headers: { "Content-Type": "application/json" },
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };

  // on change target for the form
  const handleChange = (e) => {
    setPostFormData({
      ...postFormData,
      [e.target.name]: e.target.value,
    });
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
    guestData()
  }, []);

  return (
    <div className="checkIn-container">
      <div className="checkIn-content">
        <div className="key-holder-section">
          <h2>
            CheckIn <span className="building-name">Bedford</span> Key Holder
          </h2>
          {checkInPeople.map((element) => (
            <select className="checkIn-input" >
              <option key={element.id}>
                Select your name
              </option>
              <option className="checkIn-input">{element.slack_user} </option>
            </select>
          ))}

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
                value={postFormData.slack_user}
                onChange={handleChange}
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
                value={postFormData.phone_number}
                onChange={handleChange}
                className="checkIn-input" 
              required
              />
            </div>

            <button className="checkIn-button submit-btn" type="submit">
              Submit
            </button>
          </form>

          <div className="key-holder-section">
          {getFormData.map((element) => (
            <select className="checkIn-input" >
              <option key={element.id}>
                Select your name
              </option>
              <option className="checkIn-input">{element.slack_user} </option>
            </select>
          ))}

            <div className="button-group">
              <button className="checkIn-button">CheckOut</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
