const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const pool = require("./src/config/database.conf");

const userController = require("./src/controllers/userController");
const routeController = require("./src/controllers/routeController");
const busController = require("./src/controllers/busController");
const bookingController = require("./src/controllers/bookingController");
const scheduleController = require("./src/controllers/scheduleController");

const app = express();

app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userController);
app.use("/api/route", routeController);
app.use("/api/bus", busController);
app.use("/api/booking", bookingController);
app.use("/api/schedule", scheduleController);

app.listen(process.env.PORT || 9000, () => {
  console.log("server started succesfully");

  pool
    .connect()
    .then((res) => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("Error in connecting to the database", err);
    });
});
