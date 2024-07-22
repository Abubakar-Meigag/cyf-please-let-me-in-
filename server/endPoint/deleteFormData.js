const pool = require("../database/data");

const deleteFormData = async (req, res) => {
  const { slackUser } = req.body;

  if (!slackUser) {
    return res.status(400).json({ error: "Slack user is required" });
  }

  const deleteQuery = "DELETE FROM bedford_guest WHERE slack_user = $1 RETURNING *";
  const values = [slackUser];

  try {
    const result = await pool.query(deleteQuery, values);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "No record found for the given slack user" });
    }
    res.status(200).send("Data deleted successfully");
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).send("Error deleting data");
  }
};

module.exports = deleteFormData;
