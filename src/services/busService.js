const yup = require("yup");
const busRepository = require("../repositories/busRepository");

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const busSchema = yup.object().shape({
  id: yup.string().required(),
  routeID: yup.string().required(),
  seats: yup.number().required(),
  driver: yup.string().required(),
  conductor: yup.string().required(),
  contactNumber: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .length(10),
});

async function getAllBuses() {
  try {
    const res = await busRepository.getAllBuses();
    if (res?.rowCount === 0) {
      throw Error("No any buses found");
    }
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function getBus(busId) {
  try {
    const res = await busRepository.getBus(busId);
    if (res.rowCount === 0) {
      throw Error("Bus not found");
    } else {
      return res.rows[0];
    }
  } catch (error) {
    throw error;
  }
}

async function deleteBus(busId) {
  try {
    const res = await busRepository.getBus(busId);
    if (res?.rowCount === 0) {
      throw Error("Bus not found");
    }
  } catch (error) {
    throw error;
  }
  try {
    const res = await busRepository.deleteBus(busId);
    return res;
  } catch (error) {
    throw error;
  }
}

async function addBus(bus) {
  try {
    await busSchema.validate({
      id: bus.ID,
      routeID: bus.routeId,
      seats: bus.seats,
      driver: bus.driver,
      conductor: bus.conductor,
      contactNumber: bus.contactNumber,
    });
  } catch (error) {
    console.log(error);
    throw Error("Validation error");
  }
  try {
    const existence = await busRepository.getBus(bus.ID);
    if (existence.rowCount !== 0) {
      throw Error("Bus already exists");
    }
  } catch (error) {
    throw error;
  }
  try {
    const res = await busRepository.addBus(bus);
    return res;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addBus,
  getBus,
  getAllBuses,
  deleteBus,
};
