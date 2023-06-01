const articleViewAdminRouter = require("express").Router();
const waitingListController = require("../../controllers/admin/waitingList.controller");
const articleController = require("../../controllers/admin/article.controller");
const uploadMiddleware = require("../../middlewares/upload.middleware");

articleViewAdminRouter.patch(
    "/:id",
    uploadMiddleware("picture"),
    waitingListController.updateArticleByParams
);
articleViewAdminRouter.delete("/:id", articleController.deleteArticle);



module.exports = articleViewAdminRouter;
