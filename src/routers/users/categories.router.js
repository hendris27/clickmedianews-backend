const categoryRouter = require("express").Router();
const categoryController = require("../../controllers/category.controller");

categoryRouter.get("/", categoryController.getCategory);
categoryRouter.post("/", categoryController.createArticleCategories);

module.exports = categoryRouter;
