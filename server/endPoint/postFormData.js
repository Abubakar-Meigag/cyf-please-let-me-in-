const pool = require("../database/data");

const postFormData = async (req, res) => {
  const { slack_user, phone_number } = req.body;

  if (!slack_user || !phone_number) {
    return res.status(400).json({ error: "Invalid data" });
}

  const insertQuery = "INSERT INTO bedford_guest (slack_user, phone_number) VALUES ($1, $2) RETURNING *"
  try {
    await pool.query(insertQuery, [slack_user, phone_number]);
    res.status(201).send("Data saved");

  } catch (err) {
    console.error(err);
    res.status(500).send("Error saving data");
  }
};

module.exports = postFormData;
