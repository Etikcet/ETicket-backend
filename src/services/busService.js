const busRepository = require("../repositories/busRepository");

async function addBus(bus) {
  try {
    const res = busRepository.addBus(bus);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addBus,
};
