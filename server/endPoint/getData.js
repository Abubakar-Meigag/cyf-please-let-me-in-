const pool = require("../database/data");

const getData = async (req, res) => {
  const query = "select * from bedford_keyHolders";
  try {
    const data = await pool.query(query);
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: "failure",
      message: "No data found",
    });
  }
};


module.exports = getData;
