const writeArticleRouter = require("express").Router();
const writeArticleController = require("../controllers/writeArticle.controller");
const uploadMiddleware = require("../middlewares/upload.middleware.js");

writeArticleRouter.post("/", uploadMiddleware, writeArticleController.createArticle);

module.exports = writeArticleRouter;
