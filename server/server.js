require("dotenv").config();
const express = require("express");
const app = express();

// create express instance with default configuration 
const cron = require('node-cron');
const cors = require("cors");
const port = process.env.PORT || 3099;
const pool = require("./database/data");
const bodyParser = require("body-parser");

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
pool.connect();

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});

// invoke routes from endpoint folder
const getData = require("./endPoint/getData");
const checkIn = require("./endPoint/checkIn");
const checkOut = require("./endPoint/checkOut");
const postFormData = require("./endPoint/postFormData");
const getFormData = require("./endPoint/getFormData");
const formCheckOut = require("./endPoint/formCheckOut");
const getDataForCititec = require("./endPoint/cititecData");
const deleteFormData = require('./endPoint/deleteFormData');

// run the endpoint into the server
app.get("/data", getData);
app.put("/checkIn", checkIn);
app.put("/checkOut", checkOut);
app.post('/submit', postFormData);
app.get('/formData', getFormData);
app.put('/formCheckOut', formCheckOut);
app.get('/getDataForCititec', getDataForCititec);
app.delete('/delete', deleteFormData);
