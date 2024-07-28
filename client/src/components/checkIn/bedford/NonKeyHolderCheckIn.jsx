import React, { useState } from "react";
import toast from "react-hot-toast";
import "./checkIn.css";

const NonKeyHolderCheckIn = ({ guestData }) => {
  const [slackUser, setSlackUser] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!slackUser || !phoneNumber) {
      toast.error("You must fill all the required fields");
      return;
    }

    const formData = { slackUser, phoneNumber };

    try {
      const response = await fetch(`https://cyf-please-let-me-in.onrender.com/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response from server:", errorData);
        toast.error(`Error: ${errorData.message || "Something went wrong!"}`);
        return;
      }

      toast.success(` Hey "${slackUser}" Welcome back, you have now Checked In successfully!`);
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }

    setSlackUser("");
    setPhoneNumber("");
    guestData();
  };

  return (
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
            type="number"
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
    </div>
  );
};

export default NonKeyHolderCheckIn;
