const categoryRouter = require("express").Router();
const categoryController = require("../controllers/articlesCategories.controller");

categoryRouter.get("/", categoryController.getAllArticleCategory);

module.exports = categoryRouter;
