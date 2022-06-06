const yup = require("yup");
const uuid = require("uuid");
const routeRepository = require("../repositories/routeRepository");

const routeSchema = yup.object().shape({
  bus_number: yup.string().required(),
  start: yup.string().required(),
  finish: yup.string().required(),
  arrival_time: yup.string().required(),
  departure_time: yup.string().required(),
  price: yup.number().required(),
});

async function getPopularRoutes() {
  try {
    const res = await routeRepository.getPopularRoutes();
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function getStartingAndEndingStations() {
  try {
    const res = await routeRepository.getStartingAndEndingStations();
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function checkAvailableRoutes(data) {
  try {
    const res = await routeRepository.checkAvailableRoutes(data);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

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
      bus_number: route.busNumber,
      start: route.start,
      finish: route.finish,
      arrival_time: route.arrivalTime,
      departure_time: route.departureTime,
      price: route.price,
    });
  } catch (error) {
    throw Error("Validation Error");
  }
  const data = {
    ID: uuid.v4(),
    ...route,
  };

  try {
    const res = await routeRepository.addRoute(data);
    return data;
  } catch (error) {
    throw error;
  }
}

async function deleteRoute(routeId) {
  if (routeId === null) {
    throw Error("Validation Error");
  }
  try {
    const existance = await routeRepository.getRoute(routeId);
    if (existance.rowCount === 0) {
      throw Error("Route not found");
    }
  } catch (error) {
    throw error;
  }
  try {
    const res = await routeRepository.deleteRoute(routeId);
    return true;
  } catch (error) {
    throw error;
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
