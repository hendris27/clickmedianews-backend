const categoryRouter = require("express").Router();
const categoryController = require("../../controllers/admin/categories.controller");

categoryRouter.get("/", categoryController.getCategory);
categoryRouter.post("/", categoryController.createCategories);
categoryRouter.patch("/:id", categoryController.updateCategories);
categoryRouter.delete("/:id",  categoryController.deleteCategories);

module.exports = categoryRouter;
