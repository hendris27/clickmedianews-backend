const waitingListRouter = require("express").Router();
const waitingListController = require("../../controllers/admin/waitingList.controller");
const uploadMiddleware = require("../../middlewares/upload.middleware");

waitingListRouter.get("/", waitingListController.getAllArticle);
waitingListRouter.patch(
    "/:id",
    uploadMiddleware("picture"),
    waitingListController.updateArticleByParams
);
waitingListRouter.delete("/", waitingListController.ignoreArticle);

module.exports = waitingListRouter;
