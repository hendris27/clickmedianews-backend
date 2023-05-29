const articleViewRouter = require("express").Router();
const articleViewController = require("../controllers/articleView.controller");
const authMiddleweres = require("../middlewares/auth.middleware");

articleViewRouter.post("/", authMiddleweres, articleViewController.createComment);
articleViewRouter.get("/:id", articleViewController.getOneArticleView);

module.exports = articleViewRouter;
