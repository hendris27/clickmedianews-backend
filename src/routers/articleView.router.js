const articleViewRouter = require("express").Router();
const articleViewController = require("../controllers/articleView.controller");

articleViewRouter.get("/:id", articleViewController.getOneArticleView);
articleViewRouter.post("/", articleViewController.createComment);

module.exports = articleViewRouter;
