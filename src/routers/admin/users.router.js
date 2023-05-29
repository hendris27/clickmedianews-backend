const userRouter = require("express").Router();
const userController = require("../../controllers/admin/users.controller");

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUser);
userRouter.patch("/:id", userController.updateUser);

module.exports = userRouter;
