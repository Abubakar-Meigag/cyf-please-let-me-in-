import React, { useEffect, useState } from "react";
import axios from "axios";
import "./guest.css";

function Guest() {
  const [keyHolder, setKeyHolder] = useState([]);

  const fetchData = async () => {
    const keyHolderData = await axios.get(`https://cyf-please-let-me-in.onrender.com/data`);
    const guestData = await axios.get(`https://cyf-please-let-me-in.onrender.com/formData`);

    try {
      const collectData = [...keyHolderData.data, ...guestData.data];
      setKeyHolder(collectData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="guest-container">
      <h1 className="guest-title">
        Below list is the people who could help you to get into{" "}
        <span className="building-name">Bedford</span>
      </h1>
      <div className="guest-table-container">
        <table className="guest-table">
          <thead>
            <tr>
              <th>Slack User</th>
              <th>Phone Number</th>
              <th>Call</th>
            </tr>
          </thead>
          <tbody>
            {keyHolder
              .filter((element) => element.status === "in")
              .map((element) => (
                <tr key={element.id}>
                  <td>{element.slack_user}</td>
                  <td>{element.phone_number}</td>
                  <td>
                    <a
                      href={`tel:${element.phone_number}`}
                      className="call-icon"
                    >
                      📞
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Guest;
