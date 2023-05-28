const userRouter = require("express").Router();
const userController = require("../../controllers/users.controller");

userRouter.get("/:id", userController.getUser);

module.exports = userRouter;
