const userRouter = require("express").Router();
const userController = require("../../controllers/admin/users.controller");

userRouter.get("/:id", userController.getUser);
// userRouter.post("/", userController.createUser);
// userRouter.patch("/:id", userController.updateUser);
// userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
