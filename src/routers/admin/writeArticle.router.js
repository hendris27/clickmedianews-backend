const writeArticleRouter = require("express").Router();
const writeArticleController = require("../../controllers/admin/writeArticle.controller.js");

writeArticleRouter.post("/", writeArticleController.createArticle);

module.exports = writeArticleRouter;
