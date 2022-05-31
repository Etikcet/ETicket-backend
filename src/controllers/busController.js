const e = require("express");
const express = require("express");
const authenticateToken = require("../helpers/authorization");

const router = express.Router();

const busService = require("../services/busService");

router.get("/get/all", async (req, res) => {
  try {
    const buses = await busService.getAllBuses();
    res.status(200);
    res.send({
      statusCode: 200,
      buses,
    });
  } catch (error) {}
});

router.get("/get/:ID", async (req, res) => {
  try {
    const bus = await busService.getBus(req.params.ID);
    res.status(200);
    res.send({
      statusCode: 200,
      bus: {
        ...bus,
      },
    });
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});

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

router.delete(
  "/delete/:ID",
  (req, res, next) => authenticateToken(req, res, next, "ADMIN"),
  async (req, res) => {
    try {
      const response = await busService.deleteBus(req.params.ID);
      res.status(200);
      res.send({
        message: "Bus deleted succesfully!",
        statusCode: 200,
      });
    } catch (error) {
      res.status(400);
      res.send({
        message: error.message,
        statusCode: 400,
      });
    }
  }
);

module.exports = router;
