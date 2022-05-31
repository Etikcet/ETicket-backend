const pool = require("../config/database.conf");

async function addBooking(booking) {
  try {
    const res = await pool.query("INSERT INTO Booking");
    return booking;
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

module.exports = {
  addBooking,
};
