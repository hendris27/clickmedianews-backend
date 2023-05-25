const writeArticleRouter = require("express").Router();
const writeArticleController = require("../../controllers/writeArticle.controller");

writeArticleRouter.post("/", writeArticleController.createArticle);

module.exports = writeArticleRouter;
