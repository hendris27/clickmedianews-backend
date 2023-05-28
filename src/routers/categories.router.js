const categoryRouter = require("express").Router();
const categoryController = require("../controllers/categories.controller");

categoryRouter.get("/", categoryController.getCategory);
categoryRouter.post("/", categoryController.createArticleCategories);
categoryRouter.delete("/:id", categoryController.deleteCategories);

module.exports = categoryRouter;
