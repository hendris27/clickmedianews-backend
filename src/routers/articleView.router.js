const articleViewRouter = require("express").Router();
const articleViewController = require("../controllers/articleView.controller");

articleViewRouter.post("/", articleViewController.createComment);

module.exports = articleViewRouter;
