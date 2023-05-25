const articleRouter = require("express").Router();
const articleController = require("../../controllers/auth/users/article.controller");

articleRouter.get("/", articleController.getArticle);
articleRouter.post("/", articleController.createArticle);

module.exports = articleRouter;
