import React, { useEffect, useState } from "react";
import axios from "axios";
import "./guestCititec.css";

function GuestCititec() {
  const [keyHolder, setKeyHolder] = useState([]);

  const fetchData = async () => {
    const url = "http://localhost:3099/getDataForCititec";

    try {
      const responses = await axios.get(url);
      const data = responses.data;
      setKeyHolder(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="cititec-container">
      <h1 className="cititec-title">
        Below list is the people who could help you to get into{" "}
        <span className="cititec-building-name">Cititec</span>
      </h1>
      <div className="cititec-table-container">
        <table className="cititec-table">
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
                      className="cititec-call-icon"
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

export default GuestCititec;
