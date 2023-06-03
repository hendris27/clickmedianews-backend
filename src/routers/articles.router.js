const articleRouter = require("express").Router();
const articleController = require("../controllers/article.controller");
const authMiddleweres = require("../middlewares/auth.middleware");

articleRouter.get("/", articleController.getAllArticle);
articleRouter.get("/home-category", articleController.getArticleInCategories);
articleRouter.get(
    "/manage",
    authMiddleweres,
    articleController.getArticleManage
);
articleRouter.get("/:id", articleController.getDetailArticle);
articleRouter.get(
    "/:id/logged",
    authMiddleweres,
    articleController.getDetailArticleLoggedUser
);
articleRouter.get("/:id/likes", authMiddleweres, articleController.toggleLikes);
articleRouter.get(
    "/manage/:id",
    authMiddleweres,
    articleController.getOneArticleManage
);
articleRouter.delete("/manage/:id", articleController.deleteArticle);

module.exports = articleRouter;
