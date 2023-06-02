const categoryRouter = require("express").Router();
const categoryController = require("../controllers/categories.controller");

categoryRouter.get("/", categoryController.getAllCategory);
categoryRouter.post("/", categoryController.createCategories);
categoryRouter.delete("/:id", categoryController.deleteCategories);

module.exports = categoryRouter;
