const categoryRouter = require("express").Router();
const categoryController = require("../controllers/auth/users/category.controller");

categoryRouter.get("/", categoryController.getCategory);


module.exports = categoryRouter;
