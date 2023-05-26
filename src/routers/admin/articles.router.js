const articleRouter = require("express").Router();
const articleController = require("../../controllers/admin/article.controller");

articleRouter.get("/", articleController.getArticle);
articleRouter.get("/:id", articleController.getOneArticle);

module.exports = articleRouter;
