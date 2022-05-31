const yup = require("yup");
const uuid = require("uuid");

const scheduleRepository = require("../repositories/scheduleRepository");

const scheduleSchema = yup.object().shape({
  busId: yup.string().required(),
  date: yup.date().required(),
  departure: yup.string().required(),
  arrival: yup.string().required(),
  departure_at: yup.string().required(),
  arrival_at: yup.string().required(),
  status: yup.string().required(),
});

async function deleteSchedule(id) {
  try {
    const res = await scheduleRepository.getSchedule(id);
    if (res.rowsCount === 0) {
      throw Error("Schedule Not found");
    }
  } catch (error) {
    throw error;
  }
  try {
    const res = await scheduleRepository.deleteSchedule(id);
    return true;
  } catch (error) {
    throw error;
  }
}

async function getSchedule(id) {
  try {
    const res = await scheduleRepository.getSchedule(id);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function getAllSchedules() {
  try {
    const res = await scheduleRepository.getAllSchedules();
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function addSchedule(schedule) {
  try {
    await scheduleSchema.validate({
      busId: schedule.busId,
      date: schedule.date,
      departure: schedule.departure,
      arrival: schedule.arrival,
      departure_at: schedule.departureAt,
      arrival_at: schedule.arrivalAt,
      status: schedule.status,
    });
  } catch (error) {
    throw Error("Validation Error");
  }
  try {
    const res = await scheduleRepository.addSchedule({
      ...schedule,
      ID: uuid.v4(),
    });
    return res;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addSchedule,
  getAllSchedules,
  getSchedule,
  deleteSchedule,
};
