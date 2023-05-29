const userRouter = require("express").Router();
const userController = require("../../controllers/admin/users.controller");

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUser);
userRouter.post("/:id", userController.updateUser);

module.exports = userRouter;
