const notificationRouter = require("express").Router();
const notificationController = require("../controllers/notification.controller");
const authMiddleware = require("../middlewares/auth.middleware");

notificationRouter.post(
    "/notification",
    authMiddleware,
    notificationController.getAll
);
