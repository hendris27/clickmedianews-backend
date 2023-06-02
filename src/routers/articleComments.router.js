const commentsRouter = require("express").Router();
const commentControllers = require("../controllers/articleComments.controller");
const authMiddleweres = require("../middlewares/auth.middleware");

commentsRouter.post("/", authMiddleweres, commentControllers.createComment);
commentsRouter.get("/:id", commentControllers.getAllByArticleId );
commentsRouter.delete("/:id", authMiddleweres, commentControllers.deleteComments );
commentsRouter.get("/total/:id", commentControllers.getAllByUserId );

module.exports = commentsRouter;
