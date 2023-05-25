const articleCommentRouter = require("express").Router();
const articleCommentController = require("../../controllers/admin/articleComments.controller");

articleCommentRouter.get("/", articleCommentController.getAllArticleComments);
articleCommentRouter.get("/:id", articleCommentController.getOneArticleComment);
articleCommentRouter.post("/", articleCommentController.createArticleComment);
articleCommentRouter.patch(
    "/:id",
    articleCommentController.updateArticleComment
);
articleCommentRouter.delete(
    "/:id",
    articleCommentController.deleteArticleComment
);

module.exports = articleCommentRouter;
