const pool = require("../config/database.conf");

async function deleteSchedule(id) {
  try {
    const res = await pool.query("DELETE FROM Schedule WHERE ID = $1", [id]);
    return true;
  } catch (error) {
    throw error;
  }
}

async function getSchedule(id) {
  try {
    const res = await pool.query("SELECT * FROM Schedule WHERE ID = $1", [id]);
    return res;
  } catch (error) {
    return error;
  }
}

async function getAllSchedules() {
  try {
    const res = await pool.query("SELECT * FROM Schedule");
    return res;
  } catch (error) {
    throw error;
  }
}

async function addSchedule(schedule) {
  try {
    const res = await pool.query(
      "INSERT INTO Schedule (ID,Bus_ID,Date,Departure,Arrival,Departure_at,Arival_at,Status) VALUES ($1,$2,$3,$4,$5,$6,$7,#8)",
      [
        schedule.ID,
        schedule.busId,
        schedule.date,
        schedule.departure,
        schedule.arrival,
        schedule.departureAt,
        schedule.arrivalAt,
        schedule.status,
      ]
    );
    return schedule;
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

module.exports = {
  addSchedule,
  getAllSchedules,
  getSchedule,
  deleteSchedule,
};
