const articleRouter = require("express").Router();
const articleController = require("../controllers/article.controller");
const authMiddleweres = require("../middlewares/auth.middleware");

articleRouter.get("/", articleController.getArticle);
articleRouter.get("/manage", authMiddleweres, articleController.getArticleManage);
articleRouter.get("/manage/:id", authMiddleweres, articleController.getOneArticleManage);
articleRouter.delete("/:id", articleController.deleteArticle);

module.exports = articleRouter;
