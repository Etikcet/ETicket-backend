const yup = require("yup");
const uuid = require("uuid");
const bookingRepository = require("../repositories/bookingRepository");

const searchSchema = yup.object().shape({
  start: yup.string().required(),
  end: yup.string().required(),
});

const bookingSchema = yup.object().shape({
  userId: yup.string().required(),
  routeId: yup.string().required(),
  price: yup.number().required(),
  status: yup.string().required(),
  date: yup.string().required(),
  seats: yup.number().required(),
});

async function updateBookingStatus(bookingId) {
  try {
    await bookingRepository.updateStatus(bookingId);
    return true;
  } catch (error) {
    throw error;
  }
}

async function getBookingForUser(userId) {
  try {
    const res = await bookingRepository.getBookingForUser(userId);
    return res.rows;
  } catch (error) {
    throw error;
  }
}

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
    await bookingSchema.validate({
      userId: booking.userId,
      routeId: booking.routeId,
      price: booking.price,
      status: booking.status,
      date: booking.date,
      seats: booking.seats,
    });
  } catch (error) {
    throw Error("Validation Error");
  }
  try {
    const res = await bookingRepository.addBooking({
      id: uuid.v4(),
      ...booking,
    });
    return res;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  addBooking,
  searchBookingAvailability,
  getBookingForUser,
  updateBookingStatus,
};
