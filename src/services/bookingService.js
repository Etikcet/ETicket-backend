const yup = require("yup");
const bookingRepository = require("../repositories/bookingRepository");

const searchSchema = yup.object().shape({
  start: yup.string().required(),
  end: yup.string().required(),
});

async function searchBookingAvailability(data) {
  try {
    await searchSchema.validate({ start: data.start, end: data.finish });
  } catch (error) {
    throw Error("Validation Error");
  }
  try {
    const res = await bookingRepository.searchBookingAvailabality(data);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

async function addBooking(booking) {
  try {
    const res = await bookingRepository.addBooking(booking);
    return res;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addBooking,
  searchBookingAvailability,
};
