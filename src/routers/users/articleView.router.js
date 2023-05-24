const articleViewRouter = require("express").Router();
const articleViewController = require("../../controllers/auth/users/articleView.controller");

articleViewRouter.post("/", articleViewController.createComment);

module.exports = articleViewRouter;
