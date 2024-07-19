const pool = require("../database/data");

const postFormData = async (req, res) => {
  const { phone_number, slack_user } = req.body;
  const query = "INSERT INTO bedford_guest (phone_number, slack_user) VALUES ($1, $2)"
  try {
    await pool.query(query, [name, email, phone_number, slack_user]);
    res.status(200).send("Data saved");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving data");
  }
};

module.exports = postFormData;
