const writeArticleRouter = require("express").Router();
const writeArticleController = require("../../controllers/auth/users/writeArticle.controller");

writeArticleRouter.post("/", writeArticleController.createArticle);

module.exports = writeArticleRouter;
