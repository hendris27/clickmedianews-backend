const searchResultRouter = require("express").Router();
const searchResultController = require("../../controllers/admin/searchResult.controller");

searchResultRouter.get("/", searchResultController.getArticle);

module.exports = searchResultRouter;
