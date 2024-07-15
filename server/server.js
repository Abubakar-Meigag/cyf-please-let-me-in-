require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const port = process.env.PORT || 3003;
const pool = require("./database/data");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
pool.connect();

app.listen(port, () => {
  console.log(`Server is running on Port: ${port}`);
});

// invoke routes from endpoint folder
const getData = require("./endPoint/getData");

// run the endpoint into the server
app.get("/data", getData);