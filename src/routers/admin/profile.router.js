const profileRouter = require("express").Router();
const profileController = require("../../controllers/admin/profile.controller");
const uploadMiddleware = require("../../middlewares/upload.middleware");

profileRouter.get("/", profileController.getAllProfiles);
profileRouter.get("/:id", profileController.getOneProfile);
profileRouter.post("/", uploadMiddleware, profileController.createProfile);
profileRouter.patch("/:id", uploadMiddleware, profileController.updateProfile);
profileRouter.delete("/:id", profileController.deleteProfile);

module.exports = profileRouter;
