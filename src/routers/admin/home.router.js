const homeAdminRouter = require("express").Router();
const homeAdminController = require("../../controllers/admin/home.admin.controller");

homeAdminRouter.get("/", homeAdminController.getHomeAdmin);

module.exports = homeAdminRouter;
