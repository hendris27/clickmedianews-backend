const writeArticleRouter = require("express").Router();
const writeArticleController = require("../controllers/writeArticle.controller");
const uploadMiddleware = require("../middlewares/upload.middleware.js");

writeArticleRouter.post("/", uploadMiddleware("picture"), writeArticleController.createArticle);

module.exports = writeArticleRouter;
