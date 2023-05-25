const savedArticleRouter = require("express").Router();
const savedArticleController = require("../../controllers/admin/savedArticle.controller");

savedArticleRouter.get("/", savedArticleController.getSavedArticle);
savedArticleRouter.post("/", savedArticleController.createSavedArticle);
savedArticleRouter.patch("/:id", savedArticleController.updateSavedArticle);
savedArticleRouter.delete("/:id",  savedArticleController.deleteSavedArticle);

module.exports = savedArticleRouter;
