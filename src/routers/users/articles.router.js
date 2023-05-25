const articleRouter = require("express").Router();
const articleController = require("../../controllers/article.controller");

articleRouter.get("/", articleController.getArticle);

module.exports = articleRouter;
