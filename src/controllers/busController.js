const express = require("express");
const authenticateToken = require("../helpers/authorization");

const router = express.Router();

const busService = require("../services/busService");

router.post(
  "/add",
  (req, res, next) => authenticateToken(req, res, next, "ADMIN"),
  async (req, res) => {
    try {
      const bus = await busService.addBus(req.body);
      res.status(201);
      res.send({
        bus: {
          ...bus,
        },
        statusCode: 201,
        message: "Bus added succesfully",
      });
    } catch (e) {
      res.status(400);
      res.send(e.message);
    }
  }
);

module.exports = router;
