const busRepository = require("../repositories/scheduleRepository");

async function addSchedule(schedule) {
  try {
    const res = busRepository.addSchedule(schedule);
    return res;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addSchedule,
};
