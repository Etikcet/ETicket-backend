const pool = require("../config/database.conf");

async function getAllBuses() {
  try {
    const res = await pool.query("SELECT * from bus");
    return res;
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

async function getBus(busID) {
  try {
    const res = await pool.query("SELECT * from bus WHERE id=$1", [busID]);
    return res;
  } catch (error) {
    throw Error("Internal server Error");
  }
}

async function deleteBus(busId) {
  try {
    const res = await pool.query("DELETE FROM BUS WHERE ID = $1", [busId]);
    return true;
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

async function addBus(bus) {
  try {
    const res = pool.query(
      "INSERT INTO BUS (ID,Route_ID,Seat,Driver,Conductor,contact_number) VALUES ($1,$2,$3,$4,$5,$6)",
      [
        bus.ID,
        bus.routeId,
        bus.seats,
        bus.driver,
        bus.conductor,
        bus.contactNumber,
      ]
    );
    return bus;
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

module.exports = {
  addBus,
  getBus,
  getAllBuses,
  deleteBus,
};
