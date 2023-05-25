const searchResultRouter = require("express").Router();
const searchResultController = require("../../controllers/admin/searchResult.controller");

searchResultRouter.get("/", searchResultController.getArticle);
searchResultRouter.post("/",  searchResultController.createArticle);
searchResultRouter.patch("/:id", searchResultController.updateArticle);
searchResultRouter.delete("/:id", searchResultController.deleteArticle);

module.exports = searchResultRouter;
