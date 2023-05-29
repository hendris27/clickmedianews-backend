const articleRouter = require("express").Router();
const articleController = require("../../controllers/admin/article.controller");
const authMiddleweres = require("../../middlewares/auth.middleware");

articleRouter.get("/", articleController.getArticle);
articleRouter.get("/:id", articleController.getOneArticle);
articleRouter.get("/manage", authMiddleweres, articleController.getArticleManage);
articleRouter.get("/manage/:id", authMiddleweres, articleController.getOneArticle);
articleRouter.delete("/:id", articleController.deleteArticle);


module.exports = articleRouter;
