const profileRouter = require("express").Router()
const profileController = require("../../controllers/auth/users/profile.controller")

profileRouter.get("/", profileController.getProfileByUserId)
profileRouter.patch("/", profileController.update)

module.exports = profileRouter
