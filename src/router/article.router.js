const articleRouter = require("express").Router();
const articleController = require("../controllers/auth/users/article.controller");

articleRouter.get("/", articleController.getArticle);


module.exports = articleRouter;
