const profileRouter = require("express").Router();
const profileController = require("../../controllers/admin/profile.controller");

profileRouter.get("/", profileController.getAllProfiles);
profileRouter.get("/:id", profileController.getOneProfile);
profileRouter.post("/", profileController.createProfile);
profileRouter.patch("/:id", profileController.updateProfile);
profileRouter.delete("/:id", profileController.deleteProfile);

module.exports = profileRouter;
