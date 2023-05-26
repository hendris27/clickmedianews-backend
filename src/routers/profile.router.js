const profileRouter = require("express").Router();
const profileController = require("../controllers/profile.controller");
const uploadMiddleware = require("../middlewares/upload.middleware.js");

profileRouter.get("/", profileController.getProfileByUserId);
profileRouter.patch("/", uploadMiddleware, profileController.update);

module.exports = profileRouter;
