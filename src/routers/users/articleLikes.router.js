const articleLikeRouter = require("express").Router();
const articleLikeController = require("../../controllers/articlesLike.controller");

articleLikeRouter.get("/", articleLikeController.getAllArticleLike);
articleLikeRouter.get("/:id", articleLikeController.getOneArticleLike);
articleLikeRouter.post("/", articleLikeController.createArticleLike);
articleLikeRouter.patch("/:id", articleLikeController.updateArticleLike);
articleLikeRouter.delete("/:id", articleLikeController.deleteArticleLike);

module.exports = articleLikeRouter;
