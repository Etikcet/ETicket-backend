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
    await bookingSchema.validate({
      userId: booking.userId,
      routeId: booking.routeId,
      price: booking.price,
      status: booking.status,
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
};
