const categoryRouter = require("express").Router();
const categoryController = require("../../controllers/admin/categories.controller");

categoryRouter.get("/", categoryController.getCategory);
categoryRouter.post("/", validate("createCategories"), categoryController.createCategories);
categoryRouter.patch("/:id", validate("idParams"), validate("updateCategories"), categoryController.updateCategories);
categoryRouter.delete("/:id", validate("idParams"), categoryController.deleteCategories);

module.exports = categoryRouter;
