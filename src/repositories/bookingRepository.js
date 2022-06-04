const pool = require("../config/database.conf");

async function searchBookingAvailabality({ start, finish }) {
  try {
    const res = await pool.query(
      "SELECT * FROM route WHERE start = $1 AND finish = $2",
      [start, finish]
    );
    return res;
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

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
  searchBookingAvailabality,
};
