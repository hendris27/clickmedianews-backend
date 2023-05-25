const savedArticleRouter = require("express").Router();
const savedArticleController = require("../../controllers/admin/home.admin.controller");

savedArticleRouter.get("/", savedArticleController.getSavedArticle);

module.exports = savedArticleRouter;
