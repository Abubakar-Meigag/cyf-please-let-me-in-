const pool = require("../database/data");

const postFormData = async (req, res) => {
  const { slackUser, phoneNumber} = req.body;

  if (!slackUser || !phoneNumber) {
    return res.status(400).json({ error: "Invalid data" });
}

  const checkQuery = "SELECT 1 FROM bedford_guest WHERE slack_user = $1";
  const insertQuery = "INSERT INTO bedford_guest (slack_user, phone_number) VALUES ($1, $2) RETURNING *"
  const values = [slackUser, phoneNumber];
  
  try {
    const checkResult = await pool.query(checkQuery, [slackUser]);
    
    if (checkResult.rows.length > 0) {
      return res.status(409).json({ error: "Slack user already exists" });
    }

    await pool.query(insertQuery, values);
    res.status(201).send("Data saved");

  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).send("Error saving data");
  }
};

module.exports = postFormData;
