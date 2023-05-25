const savedArticleRouter = require("express").Router();
const savedArticleController = require("../../controllers/admin/savedArticle.controller");

savedArticleRouter.get("/", savedArticleController.getSavedArticle);

module.exports = savedArticleRouter;
