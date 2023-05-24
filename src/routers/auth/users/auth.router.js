const authRouter = require("express").Router();

const authController = require("../../../controllers/auth/users/auth.controller");

authRouter.post("/login", authController.login);
authRouter.post("/register", authController.require);
authRouter.post("/forgot-password", authController.forgotPassword);
authRouter.post("/reset-password", authController.resetPassword);

module.exports = authRouter;
