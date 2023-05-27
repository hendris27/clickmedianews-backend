const authRouter = require("express").Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validator.middleware");

authRouter.post("/login", validate("authLogin"), authController.login);
authRouter.post("/register", validate("authRegister"), authController.register);
authRouter.post(
    "/forgot-password",
    validate("authForgotPassword"),
    authController.forgotPassword
);
authRouter.post(
    "/reset-password",
    validate("authResetPassword"),
    authController.resetPassword
);

module.exports = authRouter;
