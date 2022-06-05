const express = require("express");
const authenticateToken = require("../helpers/authorization");

const router = express.Router();

const routeService = require("../services/routeService");

router.get("/stations", async (req, res) => {
  try {
    const response = await routeService.getStartingAndEndingStations();
    res.status(200);
    res.send({
      data: response,
    });
  } catch (error) {
    res.status(400);
    res.send(error.message);
  }
});

router.get("/checkroute", async (req, res) => {
  try {
    const response = await routeService.checkAvailableRoutes(req.body);
    res.status(200);
    res.send(response);
  } catch (error) {
    res.status(400);
    res.send({
      message: error.message,
      statusCode: 400,
    });
  }
});

router.get("/getall", async (req, res) => {
  try {
    const response = await routeService.getAllRoutes();
    res.status(200);
    res.send({
      data: {
        routes: response,
        statusCode: 201,
      },
    });
  } catch (e) {
    res.status(404);
    res.send(e.message);
  }
});

router.get("/get/:ID", async (req, res) => {
  try {
    const response = await routeService.getRoute(req.params.ID);
    res.status(200);
    res.send({
      data: {
        route: response[0],
        statusCode: 201,
      },
    });
  } catch (e) {
    res.status(404);
    res.send(e.message);
  }
});

router.delete("/delete/:ID", async (req, res) => {
  try {
    const reponse = await routeService.deleteRoute(req.params.ID);
    res.status(200);
    res.send({
      message: "Route deleted succesfully",
      statusCode: 200,
    });
  } catch (error) {
    res.status(400);
    res.send({ message: error.message, statusCode: 400 });
  }
});

router.post(
  "/add",
  (req, res, next) => authenticateToken(req, res, next, "ADMIN"),
  async (req, res) => {
    try {
      const response = await routeService.addRoute(req.body);
      res.status(201);
      res.send({
        statusCode: 201,
        data: {
          message: "Route Created",
          route: {
            ...response,
          },
        },
      });
    } catch (error) {
      res.status(400);
      res.send({
        statusCode: 400,
        message: error?.message,
      });
    }
  }
);

module.exports = router;
