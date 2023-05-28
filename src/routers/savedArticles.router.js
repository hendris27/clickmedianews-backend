const savePostRouter = require("express").Router();
const savePostController = require("../controllers/savedArticles.controller");

savePostRouter.get("/", savePostController.getAllSavedPost);
savePostRouter.post("/", savePostController.createSavePost);
savePostRouter.delete("/:id", savePostController.deleteSavePost);

module.exports = savePostRouter;
