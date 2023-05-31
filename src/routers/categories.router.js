const categoryRouter = require("express").Router();
const categoryController = require("../controllers/categories.controller");

categoryRouter.get("/", categoryController.getAllCategory);
categoryRouter.get("/all", categoryController.getArticleInCategories);
categoryRouter.post("/", categoryController.createCategories);
// categoryRouter.post("/", categoryController.createArticleCategories);
categoryRouter.delete("/:id", categoryController.deleteCategories);
// categoryRouter.delete("/:id", categoryController.deleteCategories);

module.exports = categoryRouter;
