const pool = require("../config/database.conf");

async function addSchedule() {
  try {
    const res = await pool.query("INSERT INTO SCHEDULe");
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

module.exports = {
  addSchedule,
};
