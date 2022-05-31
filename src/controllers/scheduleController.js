const express = require("express");
const authenticateToken = require("../helpers/authorization");

const scheduleService = require("../services/scheduleService");

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const schedules = await scheduleService.getAllSchedules();
    res.status(200);
    res.send({
      statusCode: 200,
      schedules: schedules,
    });
  } catch (error) {
    res.status(400);
    res.send({
      message: error.message,
      statusCode: 400,
    });
  }
});

router.post(
  "/add",
  (req, res, next) => authenticateToken(req, res, next, "ADMIN"),
  async (req, res) => {
    try {
      const schedule = await scheduleService.addSchedule(req.body);
      res.send(201);
      res.send({
        data: {
          schedule: { ...schedule },
          statusCode: 201,
          message: "Schedule added succesfully",
        },
      });
    } catch (error) {
      res.status(400);
      res.send(error.message);
    }
  }
);

router.delete("/delete/:ID", async (req, res) => {
  try {
    const response = await scheduleService.deleteSchedule(req.params.ID);
    res.status(200);
    res.send({
      message: "Schedule deleted succesfully",
      statusCode: 200,
    });
  } catch (error) {
    res.status(400);
    res.send({
      message: error.message,
      statusCode: 400,
    });
  }
});

module.exports = router;
