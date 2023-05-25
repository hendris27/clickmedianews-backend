const waitingListRouter = require("express").Router();
const waitingListController = require("../../controllers/admin/waitingList.controller");

waitingListRouter.get("/", waitingListController.getArticle);
waitingListRouter.patch("/", waitingListController.updateArticle);

module.exports = waitingListRouter;
