import React, { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import "./checkIn.css";

const GuestCheckOut = ({ getFormData, guestData, guestUserStatus, setGuestUserStatus }) => {
  const [guestSlackUser, setGuestSlackUser] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const guestCheckOut = async () => {
    const url = `https://cyf-please-let-me-in.onrender.com/formCheckOut`;
    const body = { slack_user: guestSlackUser };

    if (!guestSlackUser) {
      toast.error('please select a your slack user..!!!');
      return;
    }

    try {
      const res = await axios.put(url, body);
      if (res.status === 200) {
        setGuestUserStatus((prevStatus) => ({
          ...prevStatus,
          [guestSlackUser]: "out",
        }));
      }

      // to invoke delete function after checkout is successful
      await deleteFormUser();
      toast.success(`Hey "${guestSlackUser}", you have now Checked out successfully!`);
    } catch (err) {
      setError(err.response ? err.response.data.error : "Internal server error");
      setSuccess(null);
    }
  };

  const deleteFormUser = async () => {
    const url = `https://cyf-please-let-me-in.onrender.com/delete`;
    const body = { slack_user: guestSlackUser };

    if (!guestSlackUser) {
      toast.error("Please select a Slack user.");
      return;
    }

    try {
      const res = await axios.delete(url, { data: body });
      if (res.status === 200) {
        setSuccess("Data deleted successfully.");
        setError(null);

        guestData();
      }
    } catch (err) {
      setError(err.response ? err.response.data.error : "Internal server error");
      setSuccess(null);
    }
  };

  return (
    <div className="key-holder-section">
      <select
        className="checkIn-input"
        value={guestSlackUser}
        onChange={(e) => setGuestSlackUser(e.target.value)}
      >
        <option>Select Your Name</option>
        {getFormData.map((element) => (
          <option key={element.slack_user} value={element.slack_user}>
            {element.slack_user}
          </option>
        ))}
      </select>

      <div className="button-group">
        <button
          className="checkIn-button"
          onClick={guestCheckOut}
          disabled={guestUserStatus[guestSlackUser] === "out"}
        >
          CheckOut
        </button>
      </div>

      {success && <div className="message success">{success}</div>}
      {error && <div className="message error">{error}</div>}
    </div>
  );
};

export default GuestCheckOut;
