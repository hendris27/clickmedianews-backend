const notificationRouter = require("express").Router();
const notificationController = require("../controllers/notification.controller");
const authMiddleware = require("../middlewares/auth.middleware");

notificationRouter.get("/", authMiddleware, notificationController.getAll);
notificationRouter.delete(
    "/",
    authMiddleware,
    notificationController.destroyNotification
);

module.exports = notificationRouter;
