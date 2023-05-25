const articleRouter = require("express").Router();
const articleController = require("../../controllers/admin/article.controller");

articleRouter.get("/", articleController.getArticle);
articleRouter.post("/", articleController.createArticle);

module.exports = articleRouter;
