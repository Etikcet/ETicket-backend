const express = require("express");

const userService = require("../services/userService");

const router = express.Router();

router.get("/login", (req, res) => {
  userService.logInUser(req.body.username, req.body.password);
  res.send("Login succesgfull");
});

router.post("/signup", async (req, res) => {
  try {
    const user = await userService.signUpUser(req.body);
    const data = {
      ...user,
      statusCode: 200,
      message: "User registered succesfully!",
    };
    res.status(200);
    res.send(data);
  } catch (e) {
    res.status(400);
    const data = {
      statusCode: 400,
      message: e?.message || "Error Occured",
    };
    res.send(data);
  }
});

module.exports = router;
