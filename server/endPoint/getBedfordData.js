// const pool = require("../database/data");

// const getBedfordData = async (req, res) => {
//   const query = `
//     SELECT k.slack_user, k.phone_number, g.slack_user, g.phone_number
//     FROM bedford_keyHolder k
//     JOIN bedford_guest g
//     ON k.status = 'in' AND g.status = 'in';
//   `;
  
//   try {
//     const data = await pool.query(query);
    
//     res.status(200).json(data.rows);
//   } catch (error) {
//     console.log(error);
    
//     res.status(500).json({
//       result: "failure",
//       message: "An error occurred while fetching the data",
//     });
//   } 
// };

// module.exports = getBedfordData;
