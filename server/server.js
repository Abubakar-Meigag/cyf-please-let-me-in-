require("dotenv").config();
const express = require("express");
const app = express();

// Import dependencies
const cors = require("cors");
const port = process.env.PORT || 3099;
const pool = require("./database/data");
const bodyParser = require("body-parser");

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
pool.connect();

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});

// Import routes from endpoint folder
const getData = require("./endPoint/getData");
const checkIn = require("./endPoint/checkIn");
const checkOut = require("./endPoint/checkOut");
const postFormData = require("./endPoint/postFormData");
const getFormData = require("./endPoint/getFormData");
const formCheckOut = require("./endPoint/formCheckOut");
const getDataForCititec = require("./endPoint/cititecData");
const deleteFormData = require("./endPoint/deleteFormData");
const checkInCititec = require("./endPoint/checkInCititec");
const checkOutCititec = require("./endPoint/checkOutCititec");

// Set up routes
app.get("/data", getData);
app.get("/formData", getFormData);
app.get("/getDataForCititec", getDataForCititec);
app.post("/submit", postFormData);
app.put("/checkIn", checkIn);
app.put("/checkOut", checkOut);
app.put("/formCheckOut", formCheckOut);
app.put("/checkInCititec", checkInCititec);
app.put("/checkOutCititec", checkOutCititec);
app.delete("/delete", deleteFormData);
