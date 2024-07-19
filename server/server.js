require("dotenv").config();
const express = require("express");
const app = express();
const cron = require('node-cron');

const cors = require("cors");
const port = process.env.PORT || 3099;
const pool = require("./database/data");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
pool.connect();

// Schedule task to truncate the table at 23:59 every day
cron.schedule('59 23 * * *', async () => {
  const query = 'TRUNCATE TABLE bedford_guest'
  try {
    await pool.query(query);
    console.log('Table truncated');
  } catch (err) {
    console.error('Error truncating table', err);
  }
});

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

// run the endpoint into the server
app.get("/data", getData);
app.put("/checkIn", checkIn);
app.put("/checkOut", checkOut);
app.post('/submit', postFormData);
app.get('/formData', getFormData);
app.put('/formCheckOut', formCheckOut);