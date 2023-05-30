const articleRouter = require("express").Router();
const articleController = require("../../controllers/admin/article.controller");

articleRouter.get("/", articleController.getArticle);
articleRouter.get("/:id", articleController.getOneArticle);
articleRouter.get("/manage", articleController.getArticleManage);
articleRouter.get("/manage/:id", articleController.getOneArticle);
articleRouter.delete("/:id", articleController.deleteArticle);


module.exports = articleRouter;
