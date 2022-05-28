const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const pool = require("./src/config/database.conf");

const logController = require("./src/controllers/userController");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", logController);

app.listen(process.env.PORT || 9000, () => {
  console.log("server started succesfully");
  pool.connect().then((res) => {
    console.log("Database connected: ");
  });
});
