const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const pool = require("./src/config/database.conf");

const userController = require("./src/controllers/userController");
const routeController = require("./src/controllers/routeController");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", userController);
app.use("/api/route", routeController);

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
