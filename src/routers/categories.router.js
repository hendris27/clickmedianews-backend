const categoryRouter = require("express").Router();
const categoryController = require("../controllers/categories.controller");
const articleController = require("../controllers/article.controller");

categoryRouter.get("/", categoryController.getAllCategory);
categoryRouter.get("/all", articleController.getArticleInCategories1);
categoryRouter.post("/", categoryController.createCategories);
categoryRouter.delete("/:id", categoryController.deleteCategories);

module.exports = categoryRouter;
