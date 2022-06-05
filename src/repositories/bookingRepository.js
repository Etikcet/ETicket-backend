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
  const { id, userId, routeId, price, status } = booking;
  try {
    const res = await pool.query(
      "INSERT INTO Booking(id,user_id,route_id,price,status) VALUES ($1,$2,$3,$4,$5)",
      [id, userId, routeId, price, status]
    );
    return booking;
  } catch (error) {
    console.log(error);
    throw Error("Internal Server Error");
  }
}

module.exports = {
  addBooking,
  searchBookingAvailabality,
};
