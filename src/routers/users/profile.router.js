const profileRouter = require("express").Router();
const profileController = require("../../controllers/profile.controller");

profileRouter.get("/", profileController.getProfileByUserId);
profileRouter.patch("/", profileController.update);

module.exports = profileRouter;
