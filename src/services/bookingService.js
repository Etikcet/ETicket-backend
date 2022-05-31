const bookingRepository = require("../repositories/bookingRepository");

async function addBooking(booking) {
  try {
    const res = bookingRepository.addBooking(booking);
    return res;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addBooking,
};
