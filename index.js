const express = require("express");
const bodyParser = require("body-parser");

const logController = require("./src/controllers/logInController");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", logController);

app.listen(9000, () => {
  console.log("server started succesfully");
});
