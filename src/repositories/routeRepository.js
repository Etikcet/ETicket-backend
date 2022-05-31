const pool = require("../config/database.conf");

async function checkAvailableRoutes(details) {
  const { start, finish, date, seats } = details;
  try {
    const res = await pool.query(
      "SELECT route.id AS route_id,bus.id AS bus_id,start,finish,seat,driver,conductor,contact_number FROM Route,bus WHERE Route.id = Bus.route_id AND start = $1 AND finish = $2 AND seat < $3",
      [start, finish, seats]
    );
    return res;
  } catch (error) {
    throw Error("Internal Server Error");
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
  const { ID, start, finish } = route;
  try {
    const res = await pool.query(
      "INSERT INTO Route (ID,Start,Finish) values ($1,$2,$3)",
      [ID, start, finish]
    );
    return true;
  } catch (error) {
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
};
