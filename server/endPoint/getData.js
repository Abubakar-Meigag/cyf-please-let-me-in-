const pool = require("../database/data");

const getData = async (req, res) => {
  const query = "select * from Entry_data";
  try {
    const data = await pool.query(query);
    res.status(200).json(data.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      result: "failure",
      message: "No data found",
    });
    pool.end();
  }
};


module.exports = getData;
