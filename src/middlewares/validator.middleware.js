const { body, param, validationResult } = require("express-validator");

const emailFormat = body("email").isEmail().withMessage("Email is not valid");

const passwordFormat = body("password")
    .isStrongPassword()
    .withMessage(
        "Password must be strong, at least 8 characters and must include capital letters, numbers and symbols"
    );

const confirmPasswordFormat = body("confirmPassword")
    .custom((value, { req }) => {
        return value === req.body.password;
    })
    .withMessage("Confirm password does not match");

const phoneNumberFormat = body("phoneNumber")
    .isLength({ min: 10 })
    .withMessage("Number length must be at least 10 digits");

const rules = {
    authLogin: [emailFormat, passwordFormat],
    authRegister: [emailFormat, passwordFormat, phoneNumberFormat],
    authForgotPassword: [emailFormat],
    authResetPassword: [
        body("code")
            .isLength({ min: 6 })
            .withMessage("Code length must be at least 6 digits"),
        emailFormat,
        passwordFormat,
        confirmPasswordFormat,
    ],
    idParams: [
        param("id")
            .toInt()
            .isDecimal()
            .withMessage("Id is not valid")
            .isInt({ min: 1 })
            .withMessage("Id need to be more than 0"),
    ],
};

const validator = (req, res, next) => {
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            throw Error("validation");
        }
        return next();
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            results: errors.array(),
        });
    }
};

const validate = (selectedRules) => [rules[selectedRules], validator];

module.exports = validate;
