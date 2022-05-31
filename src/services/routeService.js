const yup = require("yup");
const routeRepository = require("../repositories/routeRepository");

const routeSchema = yup.object().shape({
  ID: yup.string().required(),
  start: yup.string().required(),
  finish: yup.string().required(),
});

async function getAllRoutes() {
  try {
    const res = await routeRepository.getAllRoutes();
    if (res.rowCount === 0) {
      throw Error("No any routes found");
    } else {
      return res.rows;
    }
  } catch (e) {
    throw e;
  }
}

async function getRoute(ID) {
  try {
    const res = await routeRepository.getRoute(ID);
    if (res?.rowCount === 0) {
      throw Error("Matching route not found");
    } else {
      return res?.rows;
    }
  } catch (err) {
    throw err;
  }
}

async function addRoute(route) {
  try {
    await routeSchema.validate({
      ID: route.ID,
      start: route.start,
      finish: route.finish,
    });
  } catch (error) {
    throw Error("Validation Error");
  }
  try {
    const res = await routeRepository.getRoute(route.ID);
    if (res?.rowCount !== 0) {
      throw Error("Route already exists");
    }
  } catch (e) {
    throw e;
  }
  try {
    const res = await routeRepository.addRoute(route);
    return route;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addRoute,
  getRoute,
  getAllRoutes,
};