const searchResultRouter = require("express").Router();
const searchResultController = require("../../controllers/admin/searchResult.controller");

searchResultRouter.get("/", searchResultController.getArticle);
searchResultRouter.post("/", validate("createSearchResult"), searchResultController.createArticle);
searchResultRouter.patch("/:id", validate("idParams"), validate("updateSearchResult"), searchResultController.updateCategories);
searchResultRouter.delete("/:id", validate("idParams"), searchResultController.deleteCategories);

module.exports = searchResultRouter;
