const savedArticleRouter = require("express").Router();
const savedArticleController = require("../../controllers/admin/home.admin.controller");

savedArticleRouter.get("/", savedArticleController.getSavedArticle);
savedArticleRouter.post("/", validate("createSearchResult"), savedArticleController.createSavedArticle);
savedArticleRouter.patch("/:id", validate("idParams"), validate("updateSearchResult"), savedArticleController.updateSavedArticle);
savedArticleRouter.delete("/:id", validate("idParams"), savedArticleController.deleteSavedArticle);

module.exports = savedArticleRouter;
