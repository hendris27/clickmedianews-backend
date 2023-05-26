const writeArticleRouter = require("express").Router();
const writeArticleController = require("../../controllers/admin/writeArticle.controller.js");
const uploadMiddleware = require("../../middlewares/upload.middleware.js");

writeArticleRouter.post("/", uploadMiddleware, writeArticleController.createArticle);

module.exports = writeArticleRouter;
