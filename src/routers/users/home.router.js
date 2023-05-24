const homeRouter = require("express").Router();
const homeController = require("../controllers/auth/users/home.controller");

homeRouter.get("/", homeController.getHome);

module.exports = homeRouter;
