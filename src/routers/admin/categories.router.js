const categoryRouter = require("express").Router();
const categoryController = require("../../controllers/admin/categories.controller");

categoryRouter.get("/", categoryController.getCategory);


module.exports = categoryRouter;
