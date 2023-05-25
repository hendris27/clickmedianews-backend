const savePostRouter = require("express").Router();
const savePostController = require("../../controllers/savedArticles.controller");

savePostRouter.get("/", savePostController.getSavePost);
savePostRouter.delete("/", savePostController.deleteSavePost);

module.exports = savePostRouter;
