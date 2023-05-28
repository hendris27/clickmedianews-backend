const userRouter = require("express").Router();
const userController = require("../controllers/users.controller");
const authMiddleweres = require("../middlewares/auth.middleware");

userRouter.get("/", authMiddleweres, userController.getUser);

module.exports = userRouter;
