const pool = require("../database/data");

const formData = async (req, res) => {
  const { name, email, phone_number, slack_user } = req.body;
  const query = "INSERT INTO form_data (name, email, phone_number, slack_user) VALUES ($1, $2, $3, $4)"
  try {
    await pool.query(query, [name, email, phone_number, slack_user]);
    res.status(200).send("Data saved");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving data");
  }
};

module.exports = formData;
