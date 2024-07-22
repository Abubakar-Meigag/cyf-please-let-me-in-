const pool = require("../database/data");

const checkInCititec = async (req, res) => {
  const { slack_user } = req.body;

  if (!slack_user) {
    return res.status(400).json({ error: "Name is required" });
  }
  const query = `UPDATE cititec_keyHolders
                      SET status = 'in'
                      WHERE slack_user = $1 AND status = 'out'
                      RETURNING *`;
  try {
    const result = await pool.query(query, [slack_user]);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ error: "No matching entry found or already checked in" });
    }

    res.json({ message: "Status updated to in", entry: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = checkInCititec;