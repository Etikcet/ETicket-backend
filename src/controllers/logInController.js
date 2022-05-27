const express = require("express");

const logService = require("../services/logService");

const router = express.Router();

router.get("/login", (req, res) => {
  logService.logInUser(req.body.username, req.body.password);
  res.send("Login succesgfull");
});

router.post("/signup", (req, res) => {
  logService.signUpUser();
  res.send("Signup succesfully");
});

module.exports = router;
