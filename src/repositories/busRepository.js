const pool = require("../config/database.conf");

async function addBus(bus) {
  try {
    const res = pool.query(
      "INSERT INTO BUS VALUES (ID,Route_ID,Seat,Driver,Conductor"
    );
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

module.exports = {
  addBus,
};
