const waitingListRouter = require("express").Router();
const waitingListController = require("../../controllers/admin/waitingList.controller");
const uploadMiddleware = require("../../middlewares/upload.middleware");

waitingListRouter.get("/", waitingListController.getArticle);
waitingListRouter.patch("/", uploadMiddleware("picture"), waitingListController.updateArticle);
waitingListRouter.delete("/", waitingListController.ignoreArticle);

module.exports = waitingListRouter;
