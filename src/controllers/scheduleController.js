const express = require("express");
const authenticateToken = require("../helpers/authorization");

const scheduleService = require("../services/scheduleService");

const router = express.Router();

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

module.exports = router;
