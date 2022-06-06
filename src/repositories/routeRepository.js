const pool = require("../config/database.conf");

async function getPopularRoutes() {
  try {
    const res = await pool.query(
      "SELECT * from route WHERE id IN (Select route_id from (SELECT route_id,COUNT(route_id) AS route_count from booking GROUP BY route_id ORDER BY route_count DESC) AS popular)"
    );
    return res;
  } catch (error) {
    console.log("Error: ", error);
  }
}

async function checkAvailableRoutes(details) {
  const { start, finish, date, seats } = details;
  try {
    const res = await pool.query(
      "SELECT * from Route where start = $1 AND finish = $2",
      [start, finish]
    );
    return res;
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

async function getStartingAndEndingStations() {
  try {
    const res = await pool.query("SELECT Start,Finish from Route");
    return res;
  } catch (error) {
    throw Error("Internal Sever Error");
  }
}

async function getAllRoutes() {
  try {
    const res = await pool.query("SELECT * FROM Route");
    return res;
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

async function getRoute(ID) {
  try {
    const res = await pool.query("SELECT * FROM Route WHERE ID = $1", [ID]);
    return res;
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

async function addRoute(route) {
  const { ID, busNumber, start, finish, arrivalTime, departureTime, price } =
    route;
  try {
    const res = await pool.query(
      "INSERT INTO Route (ID,bus_number,Start,Finish,arrival_time,departure_time,price) values ($1,$2,$3,$4,$5,$6,$7)",
      [ID, busNumber, start, finish, arrivalTime, departureTime, price]
    );
    return true;
  } catch (error) {
    console.log("error: ", error);
    throw Error("Internal Server Error");
  }
}

async function deleteRoute(routeId) {
  try {
    const res = await pool.query("DELETE FROM Route WHERE ID = $1", [routeId]);
    return true;
  } catch (error) {
    throw Error("Internal Server Error");
  }
}

module.exports = {
  addRoute,
  getRoute,
  getAllRoutes,
  deleteRoute,
  checkAvailableRoutes,
  getStartingAndEndingStations,
  getPopularRoutes,
};
